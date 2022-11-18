/*
 * @Author: chai 1305009237@qq.com
 * @Date: 2022-11-17 19:04:52
 * @LastEditors: chai 1305009237@qq.com
 * @LastEditTime: 2022-11-18 09:50:13
 * @FilePath: \-ui-\src\api\content\employee.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/blade-plepipe/plepipe/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const getDetail = (id) => {
    return request({
        url: '/api/blade-plepipe/plepipe/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/blade-plepipe/plepipe/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/blade-plepipe/plepipe/save',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/blade-plepipe/plepipe/submit',
        method: 'post',
        data: row
    })
}

