import { updateSettings } from '../../db';

export const updateDateSetting = (value) => {
  const query = `UPDATE Settings SET value = "${value}" WHERE option = "period"`;

  return updateSettings(query);
};
