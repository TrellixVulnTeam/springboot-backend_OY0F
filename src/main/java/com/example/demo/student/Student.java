package com.example.demo.student;

import lombok.*;
import javax.persistence.*;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

// shortcuts to add ToString, Getter, Setter, and Constructor methods
@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor

@Entity(name = "Student")
@Table(
        name="student",
        uniqueConstraints = {
                @UniqueConstraint(name = "student_email_unique", columnNames = "email")
        }
)
public class Student {

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "student_sequence",
            strategy = GenerationType.AUTO
    )
    @Column(
            name = "id",
            nullable = false
    )
    private Long id;

    @NotBlank
    @Column(
            name = "name",
            nullable = false
    )
    private String name;

    @Email
    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @NotNull
    @Column(
            name = "gender",
            nullable = false
    )
    @Enumerated(EnumType.STRING)
    private Gender gender;


    public Student(String name, String email, Gender gender) {
        this.name = name;
        this.email = email;
        this.gender = gender;
    }

}
