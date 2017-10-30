import { Injectable } from '@angular/core';

@Injectable()
export class FormValidatorService {
    
    formErrors = {
        //构建新镜像
        'image_name':'',
        'basic_image':'',
        'store_path':'',
        'app_filename':'',
        //创建新应用
        'clustername':'',
        'imageid':'',
        'configid':'',
        'regionid':'',
        'flavor':'',
        'instancenumber':'',
        //创建新配置
        'configname':'',
        'envvariable':'',
        'configfile':'',
        'configdata':'',
    }
    
    validationMessages = {
        //构建新镜像
        'image_name':{
            'required':'镜像名不能为空！',
            'maxlength':'应用名称最多为50个字符！',
            'pattern':'字母开头，可以包含. - 数字在镜像名称中，. - 不可以作为名称的终结字符！'
        },
        'basic_image':{
            'required':'请选择一个基础镜像！',
        },
        'app_filename':{
            'required':'请上传已编译好的应用文件！',
        },
        //创建新应用
        'clustername':{
            'required':'应用名称不能为空！',
            'maxlength':'应用名称最多为50个字符！',
            'pattern':'应用名称由小写字母开头并结尾，可包含数字、小写字母、“-”和“.”字符！'
        },
        'imageid':{
            'required':'请选择一个镜像！',
        },
        'configid':{
            'required':'请选择挂载的配置信息！',
        },
        'regionid':{
            'required':'请选择部署区域！',
        },
        'flavor':{
            'required':'请选择硬件规格！',
        },
        'instancenumber':{
            'min':'副本数量不能为零！',
        },
        //创建新配置
        'configname':{
            'required':'配置名称不能为空！',
            'maxlength':'配置名称最多为50个字符！',
            'pattern':'配置名称由小写字母开头并结尾，可包含数字、小写字母、“-”和“.”字符！'
        },
        'envvariable':{
            'required':'请输入系统环境变量！',
            'pattern':'环境变量格式必须为键值对格式输入！'
        },
        'configfile':{
            'required':'请输入配置文件的名称和绝对路径！',
            'pattern':'配置文件及其路径应为linux合法多级绝对路径，并以文件名结尾；不可以以/等非法路径的字符结尾！'
        },
        'configdata':{
            'required':'配置数据不能为空！',
        }
    }

    constructor(){}

    onValueChanges(formGroup: any){
        for(const filed in this.formErrors){
            this.formErrors[filed] = '';
            const control = formGroup.get(filed);
            if(control && control.dirty && !control.valid){
            const message = this.validationMessages[filed];
            for(const key in control.errors){
                this.formErrors[filed] += message[key] + ' ';
            }
            }
        }
    }
}