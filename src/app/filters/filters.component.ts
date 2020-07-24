import { ClrDatagridStringFilterInterface } from "@clr/angular";
import { Repository } from '../models/repository';

export class NameFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(repo: Repository, search: string): boolean {
        return repo.name === search || repo.name.indexOf(search) >= 0;
    }
}

export class LicenseFilter implements ClrDatagridStringFilterInterface<Repository> {
    accepts(repo: Repository, search: string): boolean {
        return repo.license.name === search || repo.license.name.indexOf(search) >= 0;
    }
}

export class CommitFilter implements ClrDatagridStringFilterInterface<Repository> {
    accepts(repo: Repository, search: string): boolean {
        return repo.commits.find((c) => {
            return c.commit.message === search || c.commit.message.indexOf(search) >= 0;
        });
    }
}

export class ContributorFilter implements ClrDatagridStringFilterInterface<Repository> {
    accepts(repo: Repository, search: string): boolean {
        return repo.contributors.find((c) => {
            return c.login === search || c.login.indexOf(search) >= 0;
        });
    }
}

export class ReleaseFilter implements ClrDatagridStringFilterInterface<Repository> {
    accepts(repo: Repository, search: string): boolean {
        return repo.releases.find((rel) => {
            return rel.name === search || rel.name.indexOf(search) >= 0;
        });
    }
}

export class BranchFilter implements ClrDatagridStringFilterInterface<Repository> {
    accepts(repo: Repository, search: string): boolean {
        return repo.branches.find((br) => {
            return br.name === search || br.name.indexOf(search) >= 0;
        });
    }
}