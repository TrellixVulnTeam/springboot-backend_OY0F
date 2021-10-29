package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){

        return studentRepository.findAll();
    }

    public void addStudent(Student student){
        Boolean existsEmail = studentRepository.selectExistsEmail(student.getEmail());
        if(existsEmail){
            throw new BadRequestException("Email " + student.getEmail() + "is taken");
        } else{
            studentRepository.save(student);
        }


    }

    public void deleteStudent(Long studentID) {
        if(!studentRepository.existsById(studentID)){
            throw new StudentNotFoundException(
                    "Student with ID " + studentID + "does not exist"
            );
        }
        studentRepository.deleteById(studentID);
    }

    public void updateStudent(Long studentID, Student newStudent) {
        if(studentRepository.existsById(studentID)){

             studentRepository.findById(studentID).map( student -> {
                student.setEmail(newStudent.getEmail());
                student.setName(newStudent.getName());
                student.setGender(newStudent.getGender());
                return studentRepository.save(student);
            });
        }
    }

}
