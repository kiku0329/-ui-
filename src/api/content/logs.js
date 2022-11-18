import request from '@/router/axios';


export const getApiList = (current, size) => {
  return request({
    url: '/api/blade-content/log/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

export const getApiLogs = (id) => {
  return request({
    url: '/api/blade-content/log/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

