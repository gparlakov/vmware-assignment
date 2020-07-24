import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RepoService {
    private apiUrl = 'https://api.github.com';

    constructor(private httpClient: HttpClient) {}

    getPinnedRepos() {
        const repos = ['clarity', 'photon', 'pyvmomi', 'govmomi', 'open-vm-tools'];
        const requests = [];
        repos.forEach(repo => {
            requests.push(
                this.httpClient
                    .get(`${this.apiUrl}/repos/vmware/${repo}`)
            );
        });
        return requests;
    }

    getRepoContributors(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/contributors`)
    }

    getRepoCommits(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/commits`)
    }

    getRecentRepoCommits(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/commits?since=2020-04-07T12:00:00Z`)
    }

    getRepoReleases(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/releases`)
    }

    getRepoBranches(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/branches`)
    }

    getRepository(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}`)
    }

    getRepoReadMe(repoName) {
        return this.httpClient
        .get(`${this.apiUrl}/repos/vmware/${repoName}/readme`)
    }
}