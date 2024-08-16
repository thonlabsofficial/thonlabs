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
};

export default Utils;
