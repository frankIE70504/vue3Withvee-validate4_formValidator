<template>
    <H2>{{msg}}</H2>
    <Form @submit="onSubmit">
        <label for="name">姓名</label>
        <Field class="form-control" id="name" name="name" type="text" :class="{'is-invalid':!nameValidator}" :rules="isNameRequired" v-model="name"/>
        <ErrorMessage style="color: red" name="name"/>
        <br>
        <label for="studentId">學號</label>
        <Field class="form-control" id="studentId" name="studentId" type="text" :class="{'is-invalid':!studentIdValidator}" :rules="isStudentIdRequired" v-model="studentId"/>
        <ErrorMessage style="color: red" name="studentId"/>
        <br>
        <label for="age">年齡</label>
        <Field class="form-control" id="age" name="age" type="number" :class="{'is-invalid':!ageValidator}" :rules="isAgeRequired" v-model="age"/>
        <ErrorMessage style="color: red" name="age"/>
        <br>

        <button>加入!</button>
    </Form>
    <div>
        <div v-for="(studentDetail,index) in studentDetails" :key="studentDetail">
            <p>{{index}}.姓名:{{studentDetail.name}},學號:{{studentDetail.studentId}} ,姓名:{{studentDetail.age}}</p>
            <button @click="ctlModifyStudentDailog(index,studentDetail)">編輯</button>
            <button @click="deleteDetil(index)">刪除</button>

        </div>

    </div>
    <div>
        <ModifyStudentDailog :index="modifyIndex" :studentDetail="modifystudentDetail"
                             v-if="showModifyStudentDailog" @close="showModifyStudentDailog = false"
                             @cModifyStudent="fModifyStudent"></ModifyStudentDailog>
    </div>
</template>

<script>

    import {ErrorMessage, Field, Form} from 'vee-validate';
    import ModifyStudentDailog from './components/ModifyStudentDailog.vue'

    export default {
        name: 'App',
        components: {
            Field,
            Form,
            ErrorMessage,
            ModifyStudentDailog
        },
        data() {
            return {
                nameValidator: true,
                studentIdValidator: true,
                ageValidator: true,
                msg: 'Hello World',
                name: '',
                studentId: '',
                age: 18,
                studentDetails: [],
                showModifyStudentDailog: false,
                modifystudentDetail: {},
                modifyIndex: 0
            }
        },
        methods: {
            onSubmit() {
                var studentDetail = {
                    name: this.name,
                    studentId: this.studentId,
                    age: this.age
                };
                this.studentDetails.push(studentDetail);
                this.studentId = '';
                this.name = '';
                this.age = 18;


            },
            // Validator function
            isNameRequired(value) {
                if (value === '') {
                    this.nameValidator = false;
                    return '請填名稱';
                }
                this.nameValidator = true;
                return true;
            },
            isStudentIdRequired(value) {
                if (value === '') {
                    this.studentIdValidator = false;
                    return '請填學號';
                }
                this.studentIdValidator = true;
                return true;
            },
            isAgeRequired(value) {
                if (!value) {
                    this.ageValidator = false;
                    return '請填年齡';
                } else if (value < 18) {
                    this.ageValidator = false;
                    return '年齡錯誤';
                }
                this.ageValidator = true;
                return true;
            },
            deleteDetil(index) {
                this.studentDetails.splice(index, 1)
            },
            fModifyStudent(index, name, studentId, age) {
                this.studentDetails[index].name = name;
                this.studentDetails[index].studentId = studentId;
                this.studentDetails[index].age = age;
            },
            ctlModifyStudentDailog(index, studentDetail) {
                    this.modifyIndex = index;
                    this.modifystudentDetail = studentDetail;
                    this.showModifyStudentDailog = true;

            }

        }
    }
</script>

<style>
    .is-invalid {
        border-color: red;
    }
</style>
