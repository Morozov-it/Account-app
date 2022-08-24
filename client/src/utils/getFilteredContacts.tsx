import { Contact, GroupFilter } from "../models";

export const getFilteredContacts = (filter: GroupFilter, contacts?: Contact[]) => {
    const filters = Object.entries(filter)
        .filter(group => group[1])
        .map(group => group[0])
    if (!filters.length) return contacts

    return contacts?.filter((contact) => contact.group && filters.includes(contact.group))
}