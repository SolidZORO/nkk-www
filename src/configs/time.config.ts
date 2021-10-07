const FORMAT_DATE = 'YYYY-MM-DD';
const FORMAT_TIME = 'HH:mm:ss';

export const time = {
  FORMAT_DATE,
  FORMAT_TIME,
  FORMAT_DATE_TIME: `${FORMAT_DATE} ${FORMAT_TIME}`,
  FORMAT_DATE_TIME_INT: `${FORMAT_DATE}${FORMAT_TIME}`.replace(/[-:]/gi, ''),
  FORMAT_AUDIO_TIME: 'mm:ss',
  //
  //
  FETCH_TIMEOUT: 10,
  PULL_REFRESH_TIMEOUT: 3,
};
