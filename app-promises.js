const users = [{
    id: 1,
    name: 'Logan',
    schoolId: 101
}, {
    id: 2,
    name: 'Amrynn',
    schoolId: 33
}, {
    id: 3,
    name: 'Eisley',
    schoolId: 44
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 95
}, {
    id: 2,
    schoolId: 33,
    grade: 97
}, {
    id: 3,
    schoolId: 101,
    grade: 99
}];

const getUser = function(id) {
    return new Promise(function(resolve, reject) {
        const user = users.find(function(user) {
            return user.id === id;
        });
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = function(schoolId) {
    return new Promise(function(resolve, reject) {
        resolve(grades.filter(function(grade) {
            return grade.schoolId === schoolId;
        }));
    });
};

const getStatus = function(userId) {
    let user;
    return getUser(userId).then(function(tempUser) {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then(function(grades) {
        let average = 0;

        if (grades.length > 0) {
            average = grades.map(function(grade) {
                return grade.grade;
            }).reduce(function(a, b) {
                return a + b;
            }) / grades.length;
        }

        return `${user.name} has a ${average}% in the class.`;
    });
};

// getStatus(2).then(function(status) {
//     console.log(status);
// }).catch(function(error) {
//     console.log(error);
// });

///////////////////////////////// NEW WAY: USING ASYNC/AWAIT ///////////////////////
// const getStatusAlt = async function(userId) {
//     // throw new Error('This is an error');    // when you throw an error, from async function, it's the same as rejecting the value
//     return 'Logan';
// }

const getStatusAlt = async function(userId) {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;

    if (grades.length > 0) {
        average = grades.map(function(grade) {
            return grade.grade;
        }).reduce(function(a, b) {
            return a + b;
        }) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
}

getStatusAlt(1).then(function(status) {
    console.log(status);
}).catch(function(error) {
    console.log(error);
});
