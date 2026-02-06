import type { LocationAuthorization, NavigatorPosition } from './types';
interface PositionOptionOverrides {
    desiredAccuracy?: string;
}
declare class Navigator {
    static getCurrentPosition(overrides?: PositionOptionOverrides): Promise<NavigatorPosition>;
    static getPermissionStatus(): Promise<LocationAuthorization>;
    static online(): Boolean;
}
export default Navigator;
