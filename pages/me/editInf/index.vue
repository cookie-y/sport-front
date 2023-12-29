<template>
  <navigationBar title="修改基本资料" />
  <view class="p-15">
    <u-form labelPosition="left" :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="所属学校" prop="school.schoolName" borderBottom required @click="show = true">
        <u-input v-model="form.school.schoolName" class="bg-fff" readonly placeholder="请选择所属学校">
          <template #suffix><u-icon name="arrow-down" size="20" /></template>
        </u-input>
      </u-form-item>
      <u-form-item label="球队名称" prop="accountName" borderBottom required>
        <u-input v-model="form.accountName" placeholder="请输入名称" clearable class="bg-fff" />
      </u-form-item>
      <u-form-item label="图标" prop="logo" borderBottom>
        <cUpload v-model:fileList="form.logo" name="logo" :maxCount="1" type="account" />
      </u-form-item>
      <view class="flex mt-20">
        <u-button text="取消" plain type="primary" class="mr-20" @click="handleCancel" />
        <u-button text="确认" type="primary" @click="handleEdit" />
      </view>
    </u-form>
  </view>

  <u-picker
    :columns="[schoolList]"
    :show="show"
    keyName="schoolName"
    @confirm="handleChooseSchool"
    @cancel="show = false"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useAccountStore } from '@/store/account';
import { getSchoolList } from '@/api/school';
import { editAccountInfo } from '@/api/account';
import { TSchool } from '@/types/object/school';

interface TForm {
  school: TSchool;
  accountName: string;
  logo: Array<object>;
}

// 用户基本数据
const store = useAccountStore();
const accountInfo = computed(() => store.accountInfo);
const form = ref<TForm>({
  school: {
    schoolId: 0,
    schoolName: '',
  },
  accountName: '',
  logo: [],
});

const rules = {
  schoolName: [{ required: true, message: '请输入名称', trigger: ['change', 'blur'] }],
  accountName: [{ required: true, message: '请输入名称', trigger: ['change', 'blur'] }],
};

// 获取高校列表
const schoolList = ref<Array<TSchool>>([]);

const show = ref(false);
// 处理选择学校
const handleChooseSchool = ({ value }: { value: Array<TSchool> }) => {
  form.value = {
    ...form.value,
    school: value[0],
  };
  show.value = false;
};

onMounted(async () => {
  const { data } = await getSchoolList();
  schoolList.value = data;
  if (accountInfo.value) {
    form.value.school = accountInfo.value.school;
    form.value.accountName = accountInfo.value.accountName;
    if (accountInfo.value.logo) {
      form.value.logo = [
        {
          url: accountInfo.value.logo,
        },
      ];
    }
  }
});

// 操作
// 处理取消
const handleCancel = () => {
  uni.navigateBack();
};

const info = ref();
const { setAccountInfo } = store;

// 处理修改
const handleEdit = async () => {
  try {
    await info.value.validate();
    const { school, logo, accountName } = form.value;
    const correctLogo = logo[0].url;
    const param = { schoolId: school.schoolId, accountName, logo: correctLogo };
    const res = await editAccountInfo({ data: param });
    uni.$u.toast(res.message);
    setAccountInfo({ accountName, logo: correctLogo, school });
    uni.navigateBack();
  } catch (errors) {
    console.log(errors);
  }
};
</script>

<style lang="scss" module></style>
