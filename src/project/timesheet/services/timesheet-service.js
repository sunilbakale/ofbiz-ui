import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { safeGet } from '../../../commons/util/utility';
import { SearchUtils } from '../../../commons/util/search-utils';

@inject(HttpClient)
export class TimesheetService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createTimesheet(timesheet) {
    const body = json(timesheet);

    return this.httpClient
      .fetch(`${this.baseUrl}/services/createProjectTimesheet`, {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while creating timesheet');
        }
        return response.json();
      });
  }

  getTimesheet(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet?${query}`)
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while fetching project');
        }
        return response.json();
      });
  }

  getTimesheetList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet?${query}`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((timesheet) => {
          timesheet.fromDate = !!timesheet.fromDate
            ? new Date(timesheet.fromDate)
            : undefined;
          timesheet.thruDate = !!timesheet.thruDate
            ? new Date(timesheet.thruDate)
            : undefined;

          return timesheet;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getRateTypes() {
    return this.httpClient
      .fetch(`${this.baseUrl}/entities/RateType`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((rates) => {
          return rates;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getProjectAndPhaseAndTaskParty(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/ProjectAndPhaseAndTaskParty?${query}`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((taskParty) => {
          return taskParty;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getMyTime(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/ProjectPartyAndPhaseAndTask?${query}`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((taskParty) => {
          return taskParty;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}
