export class SystemUser {
  authorities: {
    authority: string
  }[];
  details: {
    remoteAddress: string;
  };
  authenticated: boolean;
  principal: {
    id: number;
    username: string;
    enabled: boolean;
    role: any[];
    authorities: {
      authority: string
    }[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    principalId: number;
  };
  name: string;
}
