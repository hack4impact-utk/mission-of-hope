import { UserResponse } from '@/types/users';
import { Clear } from '@mui/icons-material';
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

interface UserListProps {
  users: UserResponse[];
  onUserDelete: (user: UserResponse) => Promise<void>;
}

export default function UserList({ users, onUserDelete }: UserListProps) {
  const [currentlyDeleting, setCurrentlyDeleting] = useState<string | null>(
    null
  );
  return (
    <List>
      {/* Sorted by name */}
      {users.map((user) => (
        <ListItem
          key={user._id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              size="small"
              onClick={async () => {
                setCurrentlyDeleting(user._id);
                await onUserDelete(user);
                setCurrentlyDeleting(null);
              }}
            >
              {currentlyDeleting === user._id ? (
                <CircularProgress size={24} />
              ) : (
                <Clear fontSize="small" />
              )}
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar src={user.image || ''} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
}
