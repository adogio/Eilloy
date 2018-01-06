export default interface IEmail {
    queue: number;
    subject?: string;
    from?: string;
    to?: string;
    content?: string | boolean;
    attachment?: string;
}
