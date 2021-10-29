import fetch from 'unfetch'

const checkStatus = response => {
    if (response.ok) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error)

}

export const getAllStudents = () => {

   return fetch('api/v1/students')
        .then(checkStatus)
}

export const addNewStudent = student =>
    fetch("api/v1/students",{
        headers: {
            'Content-Type': 'application/json'  // specifies that you are sending a JSON objecy
        },
        method: 'POST',
        body: JSON.stringify(student)
    }).then(checkStatus)

export const deleteStudent = studentId => {
    return fetch(`api/v1/students/${studentId}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(checkStatus)
}

export const updateStudent = (student, studentId) => {
    return fetch(`api/v1/students/${studentId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(student)
    }).then(checkStatus)
}
