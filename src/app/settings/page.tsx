import { getSettings } from '@/server/actions/settings';
import { getAllUsers } from '@/server/actions/users';
import SettingsView from '@/views/settingsView';

export default async function SettingsPage() {
  const users = await getAllUsers();
  const settings = await getSettings();
  return <SettingsView users={users} settings={settings}></SettingsView>;
}
