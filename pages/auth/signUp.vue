<template>
  <navigationBar title="注册" />
  <view class="p-15">
    <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="所属学校" prop="schoolName" @click="show = true">
        <u-input v-model="form.schoolName" class="bg-fff" readonly placeholder="请选择所属学校">
          <template #suffix><u-icon name="arrow-down" size="20" /></template>
        </u-input>
      </u-form-item>
      <u-form-item label="邮箱" prop="email">
        <u-input class="bg-fff" v-model="form.email" clearable placeholder="请输入邮箱" />
      </u-form-item>
      <u-form-item label="验证码" prop="code">
        <u-input class="bg-fff" v-model="form.code" placeholder="请输入验证码" clearable>
          <template #suffix>
            <u-button :text="tips" size="small" :disabled="disabled" @tap="handleGetCode" />
          </template>
        </u-input>
        <u-code
          ref="uCode"
          seconds="60"
          changeText="X秒重新获取"
          @change="codeChange"
          @start="disabled = true"
          @end="disabled = false"
        />
      </u-form-item>
      <u-form-item label="申请原因" prop="reason">
        <u-textarea class="bg-fff" placeholder="xxx学院排球队" v-model="form.reason" clearable />
      </u-form-item>
    </u-form>

    <u-button text="提交" @click="handleSubmit" />

    <u-picker
      :columns="[schoolList]"
      :show="show"
      keyName="schoolName"
      @confirm="handleChooseSchool"
      @cancel="show = false"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';
import { signUp, getCode } from '@/api/auth';
import { getSchoolList } from '@/api/school';
import { Form } from '@/utils/uViewPlus';
import { TSchool } from '@/types/object/school';

interface TForm {
  schoolId: number;
  schoolName: string; // 所属高校
  email: string; // 邮箱
  code: string; // 验证码
  reason: string; // 申请原因
}
const form = ref<TForm>({
  schoolId: 0,
  schoolName: '',
  email: '',
  code: '',
  reason: '',
});
const rules = {
  schoolName: [{ required: true, message: '请选择所属高校', trigger: ['change', 'blur'] }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  code: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
  reason: [{ required: true, message: '请输入申请原因', trigger: ['change', 'blur'] }],
};

// 获取高校列表
const schoolList = ref<Array<TSchool>>([]);

onMounted(async () => {
  const { data } = await getSchoolList();
  schoolList.value = data;
});

const show = ref(false);
const handleChooseSchool = (item) => {
  form.value = {
    ...form.value,
    ...item.value[0],
  };
  show.value = false;
};

// 表单对象
const info = ref();

// 验证码
const tips = ref('');
const disabled = ref(false);
const { proxy } = getCurrentInstance() as any;

const handleGetCode = async () => {
  try {
    await Form.validateField(info.value, ['email']);

    const { uCode } = proxy.$refs;
    if (!uCode.canGetCode) {
      return;
    }

    uni.showLoading({ title: '正在获取验证码' });
    const res = await getCode({ data: { email: form.value.email } });
    uni.hideLoading();
    uni.$u.toast(res.message);
    uCode.start();
  } catch (error) {
    console.log(error);
  }
};

const codeChange = (text: string) => {
  tips.value = text;
};

// 处理提交
const handleSubmit = async () => {
  try {
    await info.value.validate();
    const params = {
      data: form.value,
    };
    await signUp(params);
    uni.$u.route({ type: 'redirect', url: '/pages/common/success' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
