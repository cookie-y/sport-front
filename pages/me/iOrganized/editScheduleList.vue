<template>
  <view>
    <navigationBar title="赛程安排" />
    <u-form labelWidth="80" ref="info" :model="form" :rules="rules" errorType="toast">
      <view :class="$style.group">
        <u-form-item label="比赛日期" required prop="date">
          <cCalendar v-model:date="form.date" :disabled="isEdit" />
        </u-form-item>
        <u-button text="新增时间段" type="warning" icon="plus-circle" @click="handleAddArrange" />
      </view>
      <view v-for="(item, arrangeIndex) in form.arrange" :key="arrangeIndex" :class="$style.group">
        <u-form-item label="比赛时间" class="time" required>
          <cDatePicker v-model="item.time" mode="time" :minHour="8" />
          <view class="ml-5 flex items-center">
            <u-icon v-show="form.arrange.length > 1" name="trash" size="24" @click="handleDelArrange(arrangeIndex)" />
          </view>
        </u-form-item>
        <view
          class="flex justify-between items-center"
          v-for="(againstItem, index) in item.against"
          :key="`against${index}`"
        >
          <view class="flex justify-between flex-1">
            <u-form-item>
              <view class="flex flex-col w-100">
                <text>比赛场地</text>
                <u-input v-model="againstItem.place" />
              </view>
            </u-form-item>
            <u-form-item>
              <view class="flex flex-col w-100" @click="handleChooseAgainst(arrangeIndex, index)">
                <text><text :class="$style.required">*</text>比赛方A</text>
                <u-button :text="againstItem.accountNameA" />
              </view>
            </u-form-item>
            <u-form-item>
              <view class="flex flex-col" @click="handleChooseAgainst(arrangeIndex, index)">
                <text><text :class="$style.required">*</text>比赛方B</text>
                <u-button :text="againstItem.accountNameB" class="w-100" />
              </view>
            </u-form-item>
          </view>
          <view class="ml-5 flex flex-col items-center">
            <u-icon
              v-show="item.against.length > 1"
              name="trash"
              class="mb-5"
              size="22"
              @click="handleDelAgainst(arrangeIndex, index, againstItem)"
            />
            <u-icon
              v-show="item.against.length === index + 1"
              name="plus-circle"
              size="20"
              @click="handleAddAgainst(arrangeIndex)"
            />
          </view>
        </view>
      </view>
      <view class="flex">
        <u-button text="返回" class="w-200" @click="handleBack" />
        <u-button :text="isEdit ? '保存' : '新增'" class="w-200" type="primary" @click="handleSubmit" />
      </view>
    </u-form>

    <!-- 删除确认弹窗 -->
    <u-modal
      :show="showModal"
      content="确认删除赛程吗"
      asyncClose
      showCancelButton
      @confirm="handleConfirmDel"
      @cancel="showModal = false"
    />

    <u-picker :show="show" :columns="options" keyName="accountName" @confirm="handleConfirmAgaist" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isEmpty, flatten, toNumber } from 'lodash';
import { onLoad } from '@dcloudio/uni-app';
import { getParticipateTeamList } from '@/api/race';
import { addOrUpdateScheduleList, getScheduleList, delSchedule } from '@/api/schedule';
import { TBasicAccount } from '@/types/object/account';
import { handleBack } from '@/utils/router';
import { flatObject } from '@/utils/method';

let raceId: number;
let date: string;

onLoad((option: any) => {
  raceId = toNumber(option.raceId);
  date = option.date;
});

interface TAgainstItem {
  id?: number; // 赛程id
  place: string; // 场地
  adversaryA: number; // 参赛方A
  accountNameA: string;
  adversaryB: number; // 参赛方B
  accountNameB: string;
}

interface TRaceScheduleItem {
  date: string; // 比赛日期
  stage?: number; // 赛段
  arrange: Array<{
    time: string; // 比赛时间
    against: Array<TAgainstItem>;
  }>;
}

const form = ref<TRaceScheduleItem>({
  date: '',
  arrange: [
    {
      time: '',
      against: [
        {
          place: '',
          adversaryA: 0,
          accountNameA: '',
          adversaryB: 0,
          accountNameB: '',
        },
      ],
    },
  ],
});

const rules = {
  date: [{ required: true, message: '请选择比赛日期', trigger: ['blur', 'change'], type: 'date' }],
};

// #region 初始化处理
const isEdit = ref(!isEmpty(date));

// 获取参赛队伍列表
const options = ref<Array<Array<TBasicAccount>>>([]);
const getParticipants = async () => {
  if (!raceId) {
    return;
  }
  const params = { data: { raceId } };
  const { data } = await getParticipateTeamList(params);
  const list = data.list.map(({ participateTeam: { accountId, accountName } }) => ({ accountId, accountName }));
  options.value = [list, [{ accountName: 'VS', accountId: 0 }], list];
};

// 获取待编辑的赛程列表
const getSchedleListByDate = async () => {
  const params = {
    data: { date, raceId },
  };
  const { data } = await getScheduleList(params);
  const result = Object.keys(data).map((time) => {
    const against = data[time].map((item) => {
      const {
        A: { participateTeam: A },
        B: { participateTeam: B },
        place,
        id,
      } = item;
      return {
        id,
        place,
        adversaryA: A.accountId,
        accountNameA: A.accountName,
        adversaryB: B.accountId,
        accountNameB: B.accountName,
      };
    });
    return { time, against };
  });
  form.value.arrange = result;
};

onMounted(async () => {
  getParticipants();
  if (isEdit.value) {
    form.value.date = date as string;
    getSchedleListByDate();
  }
});
// #endregion

// #region 处理选择对战双方
const show = ref(false);
// 选择对战双方
let currentArrange = 0;
let currentAgainst = 0;
const handleChooseAgainst = (arrangeIndex: number, againstIndex: number) => {
  show.value = true;
  currentArrange = arrangeIndex;
  currentAgainst = againstIndex;
};
const handleConfirmAgaist = ({ value }: { value: Array<TBasicAccount> }) => {
  const [A, , B] = value;
  form.value.arrange[currentArrange].against[currentAgainst].adversaryA = A.accountId;
  form.value.arrange[currentArrange].against[currentAgainst].accountNameA = A.accountName;
  form.value.arrange[currentArrange].against[currentAgainst].adversaryB = B.accountId;
  form.value.arrange[currentArrange].against[currentAgainst].accountNameB = B.accountName;
  show.value = false;
};
// #endregion

// #region 赛程操作 添加 | 删除
const againstItem: TAgainstItem = {
  place: '',
  adversaryA: 0,
  accountNameA: '',
  adversaryB: 0,
  accountNameB: '',
};
// 处理新增某个时段的赛程
const handleAddArrange = () => {
  form.value.arrange.push({ time: '', against: [{ ...againstItem }] });
};

// 处理新增对战局
const handleAddAgainst = (arrangeIndex: number) => {
  (form.value.arrange[arrangeIndex].against || []).push({ ...againstItem });
};

// 控制二次确认弹窗显示
const showModal = ref(false);
let id: Array<number> = [];
let callback: () => void;
// 处理删除指定时段的所有赛程
const handleDelArrange = (arrangeIndex: number) => {
  callback = () => {
    form.value.arrange.splice(arrangeIndex, 1);
  };
  const { against } = form.value.arrange[arrangeIndex];
  const hasEdit = against.some((item) => item.id);
  if (hasEdit) {
    showModal.value = true;
    id = against.map((item) => item.id as number);
  } else {
    callback();
  }
};

// 处理删除对战局
const handleDelAgainst = (arrangeIndex: number, againstIndex: number, item: TAgainstItem) => {
  callback = () => {
    (form.value.arrange[arrangeIndex]?.against || []).splice(againstIndex, 1);
  };
  if (item.id) {
    showModal.value = true;
    id = [item.id];
  } else {
    callback();
  }
};

// 删除赛程
const handleConfirmDel = async () => {
  console.log(id);
  const { message } = await delSchedule({ data: { id } });
  uni.$u.toast(message);
  showModal.value = false;
  callback();
};
// #endregion

// 处理保存
// 表单对象
const info = ref();
const handleSubmit = async () => {
  try {
    await info.value.validate();
    // 数据扁平化处理
    let schedule = flatObject(form.value, 'arrange');
    schedule = schedule.map((value: any) => {
      return flatObject(value, 'against');
    });
    schedule = flatten(schedule);
    // 数据校验
    const validate = schedule.some((value: any) => isEmpty(value.time) || !value.adversaryA || !value.adversaryB);
    if (validate) {
      uni.$u.toast('信息输入不完整，请检查');
      return;
    }
    const params = {
      data: { schedule, raceId },
    };
    const { message } = await addOrUpdateScheduleList(params);
    uni.$u.toast(message);
    uni.redirectTo({ url: `/pages/me/iOrganized/scheduleList?raceId=${raceId}` });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" module>
.group {
  padding: 10px;
  border-radius: 8px;
  margin: 15px;
  background: #fff;
}

.required {
  color: #dd524d;
  font-size: 20px;
  line-height: 16px;
}
</style>

<style lang="scss" scoped>
.time {
  :deep(.u-form-item__body__right__content__slot) {
    justify-content: space-between;
  }
}
</style>
