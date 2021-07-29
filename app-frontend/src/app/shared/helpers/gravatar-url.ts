import md5 from 'md5';

export class GravatarUrl {
    static get(email: string, size = 80, defaultAvatar = 'retro'): string {
        const hashedEmail = md5(email.toLowerCase());

        return `https://www.gravatar.com/avatar/${hashedEmail}?s=${size}&d=${defaultAvatar}`;
    }
}
