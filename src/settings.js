import { mapDbRows } from './common/utils';

const periodMapper = {
  year() {
    const date = new Date();
    const yearStart = new Date(date.getFullYear(), 0, 1);

    return +yearStart;
  },
  month() {
    const date = new Date();
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);

    return +monthStart;
  },
  week() {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);

    const weekStart = new Date(date.setDate(diff));

    return +weekStart;
  },
};

const optionsMapper = {
  period: (value) => {
    const periodStart = periodMapper[value]();

    return {
      periodStart,
    };
  },
};

export const prepareSettings = settingsSet => (
  mapDbRows(settingsSet[1].rows).reduce((acc, { option, value }) => {
    const mapper = optionsMapper[option];

    if (mapper == null) {
      return acc;
    }

    return {
      ...acc,
      ...mapper(value),
    };
  }, {})
);
