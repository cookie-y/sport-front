<template>
  <navigationBar title="新增比赛" />
  <view class="m-15">
    <u-form :model="form" labelWidth="110" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="比赛名称" prop="raceName" borderBottom required>
        <u-input v-model="form.raceName" placeholder="请输入比赛名称" class="bg-fff" />
      </u-form-item>
      <u-form-item label="海报" prop="racePoster" borderBottom required>
        <cUpload v-model:fileList="form.racePoster" :maxCount="1" />
      </u-form-item>
      <u-form-item label="赛制" prop="rule" borderBottom required>
        <u-radio-group v-model="form.rule">
          <u-radio class="mr-10" label="五局三胜" :name="1" />
          <u-radio label="三局两胜" :name="2" />
        </u-radio-group>
      </u-form-item>
      <u-form-item label="限制" prop="kind" borderBottom required>
        <u-radio-group v-model="form.kind">
          <u-radio class="mr-10" label="女队" :name="1" />
          <u-radio class="mr-10" label="男队" :name="2" />
          <u-radio label="混合场" :name="3" />
        </u-radio-group>
      </u-form-item>
      <u-form-item label="场地示意图" prop="venueImgs" borderBottom required>
        <cUpload v-model:fileList="form.venueImgs" />
      </u-form-item>
      <u-form-item label="比赛报名时间" prop="applyStart" borderBottom required>
        <u-tag
          :text="form.applyStart || '选择时间'"
          plain
          size="mini"
          type="primary"
          bgColor="#fff"
          @click="handleChooseDate('apply')"
        />
        <text v-if="form.applyDeadline" class="ml-5 mr-5">-</text>
        <u-tag v-if="form.applyDeadline" :text="form.applyDeadline" plain size="mini" type="primary" bgColor="#fff" />
      </u-form-item>
      <u-form-item label="比赛开始日期" prop="raceStart" borderBottom required>
        <u-tag
          :text="form.raceStart || '选择时间'"
          plain
          size="mini"
          type="primary"
          bgColor="#fff"
          @click="handleChooseDate('race')"
        />
      </u-form-item>
      <u-form-item label="备注" borderBottom>
        <u-textarea v-model="form.tips" placeholder="请输入内容" />
      </u-form-item>
      <u-form-item label="附件" borderBottom>
        <cUpload v-model:fileList="form.annex" accept="file" />
      </u-form-item>
      <view class="flex mt-20">
        <u-button text="保存草稿" plain type="primary" class="mr-20" @click="() => handleSave(RACE_STATE.EDIT)" />
        <u-button :text="isEdit ? '确认' : '新增'" type="primary" @click="() => handleSave(RACE_STATE.EXAMINE)" />
      </view>
    </u-form>

    <u-calendar
      :show="showCalendar"
      :mode="isApply ? 'range' : 'single'"
      :minDate="isApply ? null : dayjs(form.applyDeadline).add(1, 'day').format()"
      :defaultDate="defaultDate"
      color="#003eb3"
      round="4"
      @confirm="handleConfirmDate"
      @close="showCalendar = false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import { getUrlParam } from '@/utils/router';
import { RACE_STATE } from '@/constants/race';
import { TFile } from '@/types/file';
import { addRace, editRace, getRaceDetail } from '@/api/race';

interface TForm {
  raceId?: number; // 比赛id
  raceName: string; // 比赛名称
  rule: number; // 赛制
  kind: number; // 限制
  applyStart: string; // 报名开始日期
  applyDeadline: string; // 报名截止日期
  raceStart: string; // 比赛开始时间
  racePoster?: Array<TFile>; // 比赛海报
  venueImgs?: Array<TFile>; // 场地示意图
  tips?: string; // 备注
  annex?: Array<TFile>; // 附件
}
const form = ref<TForm>({
  raceStart: '',
  applyStart: '',
  rule: 1,
  kind: 1,
  applyDeadline: '',
  raceName: '',
  annex: [],
  tips: '',
  racePoster: [],
  venueImgs: [],
});
const rules = {
  raceName: [{ required: true, message: '请输入比赛名称' }],
  raceStart: [{ required: true, message: '请选择比赛开始日期' }],
  applyStart: [{ required: true, message: '请选择报名开始日期' }],
  applyDeadline: [{ required: true, message: '请选择报名结束日期' }],
};

// 数据初始化
const raceId = getUrlParam('raceId');
const isEdit = ref<boolean>(Boolean(raceId));
onMounted(async () => {
  if (isEdit.value) {
    const res = await getRaceDetail({ data: { raceId } });
    const { raceName, kind, applyStart, applyDeadline, raceStart, rule } = res.data;
    form.value = { raceName, kind, raceStart, applyStart, applyDeadline, rule, raceId };
  }
});

// 处理选择日期
const showCalendar = ref<boolean>(false);
const currentField = ref<string>('apply');
const isApply = computed(() => currentField.value === 'apply');
const defaultDate = computed(() => {
  if (isApply.value) {
    if (form.value.applyDeadline) {
      return [form.value.applyStart, form.value.applyDeadline];
    }
    return null;
  }
  return form.value.raceStart || dayjs(form.value.applyDeadline).add(1, 'day').format();
});

const handleChooseDate = (field: string) => {
  if (field === 'race' && !form.value.applyStart) {
    uni.$u.toast('请先选择报名时间');
    return;
  }
  currentField.value = field;
  showCalendar.value = true;
};

const handleConfirmDate = (value: Array<string>) => {
  if (isApply.value) {
    // 选择报名时间
    [form.value.applyStart] = value;
    form.value.applyDeadline = value[value.length - 1];
  } else {
    // 选择比赛开始时间
    [form.value.raceStart] = value;
  }
  showCalendar.value = false;
};

// 处理数据提交
const info = ref();
// 保存
const handleSave = async (state: number) => {
  try {
    await info.value.validate();
    let message = '';
    const params = {
      data: {
        ...form.value,
        state,
        venueImgs: form.value.venueImgs?.join(','),
        racePoster: form.value.racePoster?.join(','),
        annex: form.value?.annex?.join(','),
      },
    };
    if (isEdit.value) {
      // 编辑
      ({ message } = await editRace(params));
    } else {
      // 新增
      ({ message } = await addRace(params));
    }
    uni.$u.toast(message);
    uni.redirectTo({ url: '/pages/me/iOrganized/index' });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" module></style>
