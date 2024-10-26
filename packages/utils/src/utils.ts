const Utils = {
  getFirstAndLastInitials: (name: string) => {
    const nameSplit = name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[nameSplit.length - 1];

    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  },

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  normalizeString(value: string, whiteSpaceReplace = '-') {
    const alphabetSpecialChars =
      'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    const alphabetCommonChars = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';

    const normalizedValue = value
      .trim()
      .toLowerCase()
      .trim()
      .replace(/ /g, whiteSpaceReplace)
      .replace(/--/g, '-')
      .replace(/[&/\\#,+()$~%.'":*?<>{}\[\]]/g, '')
      .replace(new RegExp(alphabetSpecialChars.split('').join('|'), 'g'), (c) =>
        alphabetCommonChars.charAt(alphabetSpecialChars.indexOf(c)),
      );

    return normalizedValue;
  },

  randString(size: number) {
    return Array.from({ length: size })
      .map(() => Math.random().toString(36).substring(2))
      .join('');
  },

  getSubDomains(domain: string) {
    if (!domain) {
      return '';
    }

    const parts = domain.split('.');

    if (parts.length <= 2) {
      return '';
    }

    return parts.slice(0, -2).join('.');
  },

  getDOMAttributes(element: HTMLElement) {
    return Object.fromEntries(
      Array.from(element.attributes).map((attr) => [attr.name, attr.value]),
    );
  },
};

export default Utils;
