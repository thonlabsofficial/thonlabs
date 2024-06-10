const Utils = {
  getFirstAndLastInitials: (name: string) => {
    const nameSplit = name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[nameSplit.length - 1];

    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  },
};

export default Utils;
