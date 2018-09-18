import 'isomorphic-fetch';
import * as qs from 'qs';

import { IObject } from '@src/types';

export class WrappedFetch {
  public getConfig = { 
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }
  
  public postConfig = {
    method: 'POST'
  }

  public postJSONConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  public get(url: string, data?: IObject, type?: string) {
    if (data) {
      url = this.ensureGetUrl(url, data);
    } 
    return this.base(
      url, 
      this.getConfig,
      type
    );
  }

  public post(url: string, data: IObject, type?: string) {
    return this.base(url, {
      ...this.postConfig,
      ...this.ensureFormData(data)
    }, type)
  }

  public postJSON(url: string, data: IObject, type?: string) {
    return this.base(url, {
      ...this.postJSONConfig,
      ...this.ensureJSONData(data)
    }, type)
  }

  public base(url: string, config?: any, type?: string): Promise<any> {
    const raw = type === 'raw';
    return fetch(url, config)
      .then(this.checkStatus)
      .then(
        (res: any) => {
          return raw ? res.text() : res.json();
        }
      ).catch(
        (error: any) => ({
          code: error.code || 10001,
          message: error.message || error
        })
      );
  }

  public checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      if (response.status === 401) {
        // call login
      } else if (response.status === 403) {
        // call auth apply
      }
      return Promise.reject({
        code: response.status,
        message: response.statusText
      })
    }
  }

  public ensureFormData(data: IObject) {
    const formData = new FormData();
    Object.keys(data).forEach(
      (key) => {
        formData.append(key, data[key]);
      }
    );
    return {
      body: formData
    }
  }

  public ensureJSONData(data: IObject) {
    return {
      body: JSON.stringify(data)
    }
  }

  public ensureGetUrl(url: string, data: IObject) {
    return this.injectQueryToUrl(url, this.objectToQuery(data));
  }

  public injectQueryToUrl(url: string, query?: string): string {
    if (query) {
      if (url.indexOf('?') === -1) {  
        url += '?' + query;
      } else {  
        url += '&' + query; 
      }  
    }
    return url;
  }

  public objectToQuery(data: IObject): string {
    const paramsArray: string[] = [];
    Object.keys(data).forEach(
      key => paramsArray.push(
        qs.stringify({ [key]: data[key] && typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key] })
      )
    )  
    return paramsArray.join('&');
  }
}

export const ajax = new WrappedFetch();