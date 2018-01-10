export default interface IWarning {
    info?: string;
    button?: string;
    onClick?: () => void;
    more?: Array<{
        icon: string,
        info: string,
        value: string,
    }>;
}
