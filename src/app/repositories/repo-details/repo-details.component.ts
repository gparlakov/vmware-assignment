import {Component, OnInit, OnDestroy} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../repositories.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "repo-details",
    templateUrl: "repo-details.component.html",
    styleUrls: ["repo-details.component.scss"]
})
export class RepoDetailsComponent implements OnInit, OnDestroy {
    public readMe: any;
    public repository: any;
    public commits: any;
    public repoName: string;
    public isDetailsTabActive: boolean = true;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private repoService: RepoService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.repoName = params['name'];
        });

        this.subscriptions.push(
            this.repoService.getRecentRepoCommits(this.repoName)
                .subscribe(commits => this.commits = commits)
        );

        this.subscriptions.push(
            this.repoService.getRepoReadMe(this.repoName)
                .subscribe(readMe => this.readMe = readMe)
        );

        this.subscriptions.push(
            this.repoService.getRepository(this.repoName)
                .subscribe(repository => this.repository = repository)
        );
    }

    isObject(value): boolean {
        return typeof(value) === "object";
    }

    onDownload(url): void {
        window.open(`${url}.patch`, "_blank");
    }

    onTabChanged(val): void {
        this.isDetailsTabActive = val;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
