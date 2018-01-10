export default interface IWarning {
    info?: string;
    button?: string;
    disable?: boolean;
    onClick?: () => void;
    more?: Array<{
        icon: string,
        info: string,
        value: string,
    }>;
}
