import axios from 'axios';

export const ListCalls = () => {
  const url = 'https://aircall-job.herokuapp.com/activities';

  return axios(url);
};

export const ReadCall = id => {
  const url = `https://aircall-job.herokuapp.com/activities/${id}`;

  return axios(url);
};

export const UpdateCall = (id, data) => {
  const url = `https://aircall-job.herokuapp.com/activities/${id}`;

  return axios.post(url, data);
};
