const profiles = []; // In-memory array to store profiles

const dbConnect = async () => {
    return {
        collection: () => ({
            insertOne: async (data) => {
                profiles.push(data);
                return { acknowledged: true };
            },
            deleteOne: async (query) => {
                const index = profiles.findIndex(profile => profile.name === query.name);
                if (index !== -1) {
                    profiles.splice(index, 1);
                    return { acknowledged: true, deletedCount: 1 };
                }
                return { acknowledged: true, deletedCount: 0 };
            },
            updateOne: async (query, update) => {
                const profile = profiles.find(profile => profile.name === query.name);
                if (profile) {
                    Object.assign(profile, update.$set);
                    return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
                }
                return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
            },
            find: () => {
                // Return an object with a `toArray` method to simulate MongoDB's cursor behavior
                return {
                    toArray: async () => profiles
                };
            },
        })
    };
};

module.exports = dbConnect;
