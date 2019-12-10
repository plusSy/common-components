<!--
 * @Description: Address select component
 * @Author: Ocj-Team
 * @Date: 2019/10/12
 * @LastEditTime: 2019/10/12 14:47:48
 * @LastEditors: syl
-->
<template>
  <div :class="!multiple ? 'ocjCascader' : 'ocjCascader multiple'"  v-clickoutside="hide">
    <template v-if="!multiple">
      <div
        :class="['el-input__inner', 'cascaderEffect', { 'is-disabled': disabled}]"
        readonly
        v-for="(val, index) in effectValue"
        :key="index"
        :suffix-icon="`el-icon-arrow-${downOrUp}`"
        :title="val.name"
        @click="handleFocus"
      >
        <template v-if="val.name">{{ val.name }}</template>
        <div v-else class="color-gray-700">{{ placeholder }}</div>
        <span>
          <em :class="`el-icon-arrow-${downOrUp}`"></em>
        </span>
      </div>
    </template>
    <template v-else>
      <div :class="['cascaderPanel', 'text-14',  { 'is-disabled': disabled}]" @click="handleFocus">
        <template v-if="effectValue.length > 0">
          <el-tag
              v-for="(val, valIdx) in effectValue"
              :key="valIdx"
              type="info"
              closable
              :data-value="val.id"
              @close="handleClose"
          >
            {{ val.name }}
          </el-tag>
        </template>
        <div v-else class="color-gray-700 placeholder-lineHeight-32">{{ placeholder }} </div>
        <span class="icon">
          <em :class="`el-icon-arrow-${downOrUp}`"></em>
        </span>
      </div>
    </template>

    <div v-show="downOrUp === 'up'" class="ocjCacaderPanel">
      <em class="el-icon-caret-top"></em>
      <el-cascader-panel
        ref="cascaderRef"
        :value="panelValue"
        :props="panelProps"
        @change="handelPanelChange"
      ></el-cascader-panel>
    </div>
  </div>
</template>

<script src="./cascader.js"></script>
