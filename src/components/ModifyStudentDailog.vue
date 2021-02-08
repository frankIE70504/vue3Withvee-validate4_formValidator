<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            編輯
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <Form @click.prevent>
                                <label for="name">姓名</label>
                                <Field class="form-control" id="name" name="name" type="text" :class="{'is-invalid':!nameValidator}" :rules="isNameRequired" v-model="modifyName"/>
                                <ErrorMessage style="color: red" name="name"/>
                                <br>
                                <label for="studentId">學號</label>
                                <Field class="form-control" id="studentId" name="studentId" type="text" :class="{'is-invalid':!studentIdValidator}" :rules="isStudentIdRequired" v-model="modifyStudentId"/>
                                <ErrorMessage style="color: red" name="studentId"/>
                                <br>
                                <label for="age">年齡</label>
                                <Field class="form-control" id="age" name="age" type="number" :class="{'is-invalid':!ageValidator}" :rules="isAgeRequired" v-model="modifyAge"/>
                                <ErrorMessage style="color: red" name="age"/>
                                <br>
                            </Form>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button style="display:inline;" class="modal-default-button" @click="cModifyStudent">
                                修改
                            </button>
                            <button style="display:inline; margin-left: 10px" class="modal-default-button" @click="$emit('close')">
                                取消
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {ErrorMessage, Field, Form} from 'vee-validate';

    export default {
        name: 'ModifyStudentDailog',
        components: {
            Field,
            Form,
            ErrorMessage
        },
        props: ['studentDetail', 'age', 'index'],
        data() {
            return {
                nameValidator: true,
                studentIdValidator: true,
                ageValidator: true,
                modifyName: this.studentDetail.name,
                modifyStudentId: this.studentDetail.studentId,
                modifyAge: this.studentDetail.age,
                msg: "frankie 好帥!",
            }
        },
        methods: {
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
            cModifyStudent() {
                if (this.nameValidator && this.studentIdValidator && this.ageValidator) {
                    this.$emit('cModifyStudent', this.index, this.modifyName, this.modifyStudentId, this.modifyAge);
                    this.$emit('close')
                }

            }
        }
    }
</script>
<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        display: block;
        margin-top: 1rem;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
