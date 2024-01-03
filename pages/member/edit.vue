<template>
  <view>
    <navigationBar :title="isEdit ? '编辑队员' : '新增队员'" />
    <u-form :model="form" labelWidth="100" :rules="rules" ref="info" errorType="toast" :class="$style.container">
      <u-form-item label="学号" prop="studentId" borderBottom required>
        <u-input v-model="form.studentId" placeholder="请输入学号" class="bg-fff" />
      </u-form-item>
      <u-form-item label="姓名" prop="name" borderBottom required>
        <u-input v-model="form.name" placeholder="请输入姓名" class="bg-fff" />
      </u-form-item>
      <u-form-item label="性别" prop="name" borderBottom>
        <u-radio-group v-model="form.sex" placement="row">
          <u-radio label="男" :name="0" class="mr-15" />
          <u-radio label="女" :name="1" />
        </u-radio-group>
      </u-form-item>
      <u-form-item label="照片" prop="image" borderBottom required>
        <cUpload v-model:fileList="form.image" :maxCount="1" type="member" />
      </u-form-item>
      <u-form-item label="类型" prop="type" borderBottom>
        <u-tag
          :text="MEMBER_TYPES.get(form.type)"
          plain
          size="mini"
          type="primary"
          borderColor="#003eb3"
          @click="showPicker = true"
        />
        <u-picker
          :show="showPicker"
          :columns="[[...MEMBER_TYPES.values()]]"
          @confirm="handleConfirmType"
          @cancel="showPicker = false"
        />
      </u-form-item>
      <u-form-item label="联系方式" prop="phone" borderBottom required>
        <u-input v-model="form.phone" placeholder="请输入手机号" clearable class="bg-fff" />
      </u-form-item>
      <u-form-item label="是否是队长" prop="isCaptain" borderBottom>
        <u-radio-group v-model="form.isCaptain" placement="row">
          <u-radio label="是" :name="true" class="mr-15" />
          <u-radio label="否" :name="false" />
        </u-radio-group>
      </u-form-item>
      <view class="flex mt-20">
        <u-button text="取消" plain type="primary" class="mr-20" @click="handleBack" />
        <u-button :text="isEdit ? '确认' : '新增'" type="primary" @click="handleEdit" />
      </view>
    </u-form>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { MEMBER_TYPES } from '@/constants/member';
import { handleBack } from '@/utils/router';
import { getMemberDetail, addMember, editMember } from '@/api/member';
import { TFile } from '@/types/file';

interface TForm {
  studentId: number | string;
  name: string; // 队员名称
  image: Array<TFile>; // 队员照片
  sex: number; // 性别
  phone: string; // 手机号
  type: number; // 类型
  isCaptain: boolean; // 是否是队长
}
const form = ref<TForm>({
  studentId: '',
  sex: 0,
  phone: '',
  name: '',
  isCaptain: false,
  type: 0,
  image: [],
});
const rules = {
  studentId: [{ required: true, message: '请输入学号' }],
  name: [{ required: true, message: '请输入姓名' }],
  phone: [{ required: true, message: '请输入联系方式' }],
  // image: [{ required: true, message: '请上传成员照片' }],
};

// 获取成员信息
const isEdit = ref<boolean>(false);
const getInfo = async (studentId: number) => {
  const params = {
    data: { studentId },
  };
  const res = await getMemberDetail(params);
  const { image, ...other } = res.data;
  form.value = {
    ...other,
    image: [
      {
        url: image,
      },
    ],
  };
};

onLoad((options) => {
  if (options.id) {
    isEdit.value = true;
    getInfo(+options.id);
  }
});

// 处理选择type
const showPicker = ref<boolean>(false);

const handleConfirmType = (event: { value: Array<string> }) => {
  const { value } = event;
  const keyValue = [...MEMBER_TYPES].find((v) => {
    return v[1] === value[0];
  });
  if (keyValue) {
    [form.value.type] = keyValue;
  }
  showPicker.value = false;
};

// 处理确认/新增
const info = ref();

const handleEdit = async () => {
  try {
    await info.value.validate();
    let res;
    const param = {
      data: { ...form.value, image: form.value.image[0].url },
    };
    if (isEdit.value) {
      // 编辑
      res = await editMember(param);
    } else {
      // 新增
      res = await addMember(param);
    }
    uni.$u.toast(res.message);
    handleBack();
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" module>
.container {
  margin: 15px 20px;
}
</style>
