import {Component, OnDestroy} from "@angular/core";
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RepoService } from './repositories.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Repository } from '../models/repository';
import {
    NameFilter, LicenseFilter, CommitFilter,
    ContributorFilter, ReleaseFilter, BranchFilter
} from '../filters/filters.component';

@Component({
    selector: "repositories-view",
    templateUrl: "repositories.component.html",
    styleUrls: ["repositories.component.scss"]
})
export class RepositoriesComponent implements OnDestroy {
    public subscriptions: Subscription[] = [];
    public repositories: Repository[] = [];
    public showDetailsPage: boolean = false;
    public nameFilter = new NameFilter();
    public licenseFilter = new LicenseFilter();
    public commitFilter = new CommitFilter();
    public contributorFilter = new ContributorFilter();
    public releaseFilter = new ReleaseFilter();
    public branchFilter = new BranchFilter();

    constructor(
        private repoService: RepoService,
        private router: Router,
        private route: ActivatedRoute) {

        router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
            if (event["url"] === "/repositories") {
                this.showDetailsPage = false;
            } else {
                this.showDetailsPage = true;
            }
        })

        repoService.getPinnedRepos().forEach(req => {
            this.subscriptions.push(
                req.subscribe((repository) => {
                    let sub = combineLatest(
                        this.repoService.getRepoContributors(repository.name),
                        this.repoService.getRepoCommits(repository.name),
                        this.repoService.getRepoReleases(repository.name),
                        this.repoService.getRepoBranches(repository.name)
                    ).pipe(
                        map(([contributors, commits, releases, branches]) => {
                            return { contributors, commits, releases, branches };
                        })
                    );

                    sub.subscribe(r => {
                        const repo: Repository = {
                            name: repository.name,
                            license: repository.license,
                            contributors: r.contributors,
                            commits: r.commits,
                            branches: r.branches,
                            releases: r.releases
                        };
                        
                        this.repositories.push(repo);
                    });
                })
            );
        });
    }

    navigateToDetails(repoName): void {
        this.showDetailsPage = true;
        this.router.navigate(['details', repoName], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
