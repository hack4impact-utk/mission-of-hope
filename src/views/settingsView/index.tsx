'use client';
import { UserResponse } from '@/types/users';
import UserList from './UserList';
import { Box, Container, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AdminAutocomplete from './AdminAutocomplete';
import { useState } from 'react';
import LoadingButton from '@/components/LoadingButton';
import { SettingsResponse } from '@/types/settings';
import { MuiChipsInput } from 'mui-chips-input';
import { z } from 'zod';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';

interface SettingsViewProps {
  users: UserResponse[];
  settings: SettingsResponse;
}

export default function SettingsView({ users, settings }: SettingsViewProps) {
  const [newAdmins, setNewAdmins] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allowedEmails, setAllowedEmails] = useState(settings.allowedEmails);
  const adminUsers = users.filter((user) => user.isAdmin);
  const normalUsers = users.filter((user) => !user.isAdmin);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const allowedEmailsDirty =
    allowedEmails.join(',') !== settings.allowedEmails.join(',');

  const updateSettings = async () => {
    return await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userEmails: allowedEmails,
        adminIds: newAdmins.map((user) => user._id),
      }),
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await updateSettings();

      if (!res.ok) {
        showSnackbar('Failed to update settings', 'error');
        return;
      }

      showSnackbar('Settings updated successfully', 'success');
      // weird hack
      router.refresh();
      router.refresh();
      setNewAdmins([]);
    } catch (e) {
      showSnackbar('Failed to update settings', 'error');
      console.error('Failed to update settings', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (user: UserResponse) => {
    try {
      const res = await fetch(`/api/admins/${user._id}/remove`, {
        method: 'PUT',
      });

      if (!res.ok) {
        showSnackbar('Failed to remove admin', 'error');
        return;
      }

      showSnackbar('Admin removed successfully', 'success');
      router.refresh();
    } catch (e) {
      showSnackbar('Failed to remove admin', 'error');
      console.error('Failed to remove admin', e);
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Grid2 container>
          <Grid2 xs={12} sx={{ mb: 3 }}>
            <Typography variant="h3">Settings</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="h6">Admins</Typography>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <UserList users={adminUsers} onUserDelete={handleRemoveAdmin} />
          </Grid2>
          <Grid2 xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Add admins</Typography>
          </Grid2>
          <Grid2 xs={12} md={6} sx={{ mt: 1 }}>
            <AdminAutocomplete
              value={newAdmins}
              users={normalUsers}
              onChange={setNewAdmins}
            />
          </Grid2>
          <Grid2 xs={12} sx={{ mt: 3 }}>
            <Typography variant="h6">Users</Typography>
          </Grid2>
          <Grid2 xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              Emails allowed to log in
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="caption" color="textSecondary">
              Emails ending with &quot;@compassionministries.net&quot; are
              allowed automatically.
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={6} sx={{ mt: 1 }}>
            <MuiChipsInput
              validate={(email) => {
                const emailSchema = z.string().email();
                return (
                  emailSchema.safeParse(email).success &&
                  !allowedEmails.includes(email)
                );
              }}
              value={allowedEmails}
              onChange={setAllowedEmails}
              fullWidth
              hideClearAll
            />
          </Grid2>
          <Grid2 xs={12} sx={{ mt: 2 }}>
            {/* TODO: update to loading button when ready */}
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              disabled={newAdmins.length === 0 && !allowedEmailsDirty}
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
