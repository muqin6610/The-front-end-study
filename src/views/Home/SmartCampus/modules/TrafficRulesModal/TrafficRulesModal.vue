<template>
  <el-drawer
    size='720px'
    :visible.sync="visible"
    :show-close='false'
    :before-close="close"
    :title="title"
    >
      <el-form :rules="rules" ref="form" :model="form" label-width="110px">
        <el-form-item label="规则名称" prop="ruleTimeName">
          <el-input style="width:220px;" placeholder="请输入规则名称" v-model="form.ruleTimeName" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTs">
          <el-date-picker
            v-model="form.startTs"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTs">
          <el-date-picker
            v-model="form.endTs"
            type="datetime"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="过闸次数" prop="count">
          <el-input-number :min="0" style="width:220px;" v-model="form.count"/>
        </el-form-item>
        <el-form-item label="通行限制">
           <div class='type-box'>
            <span class='type-title'>类型</span>
            <el-radio-group name="radioGroup" v-model="typeData">
              <el-radio label="everyDay">每天</el-radio>
              <el-radio label="weekly">每周</el-radio>
            </el-radio-group>
          </div>
          <!--每天-->
          <div v-if='typeData === "everyDay"'>
            <div class='week-box'>
              <div class='picker-box'>
                <div>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="dailyTime.startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="dailyTime.endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: dailyTime.startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                </div>
              </div>
            </div>
          </div>
          <!--每周-->
          <div v-if='typeData === "weekly"'>
            <div class='week-box'>
              <span class='week-title'>周一</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Monday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Monday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Monday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='MondayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in MondayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Monday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Monday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Monday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='MondayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周二</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Tuesday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Tuesday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Tuesday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='TuesdayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in TuesdayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Tuesday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Tuesday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Tuesday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='TuesdayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周三</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Wednesday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Wednesday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Wednesday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='WednesdayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in WednesdayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Wednesday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Wednesday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Wednesday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='WednesdayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周四</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Thursday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Thursday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Thursday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='ThursdayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in ThursdayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Thursday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Thursday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Thursday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='ThursdayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周五</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Friday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Friday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Friday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='FridayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in FridayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Friday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Friday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Friday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='FridayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周六</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Saturday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Saturday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Saturday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='SaturdayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in SaturdayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Saturday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Saturday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Saturday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='SaturdayPickerLess(index)'></i>
                </div>
              </div>
            </div>
            <div class='week-box'>
              <span class='week-title'>周日</span>
              <div class='picker-box'>
                <div class='item-box'>
                  <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Sunday[0].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Sunday[0].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Sunday[0].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-plus' @click='SundayPicker'></i>
                </div>
                <div class='item-box' v-for='(item, index) in SundayData'>
                 <el-time-select 
                    style='margin-right: 10px;' 
                    v-model="Sunday[index + 1].startTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59' }" 
                    placeholder="开始时间">
                  </el-time-select>
                  <el-time-select 
                    v-model="Sunday[index + 1].endTime" 
                    :picker-options="{ start: '00:00',step: '00:10',end: '23:59',minTime: Sunday[index + 1].startTime }" 
                    placeholder="结束时间">
                  </el-time-select>
                  <i class='el-icon-minus' @click='SundayPickerLess(index)'></i>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>

    <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <el-button :style="{marginRight: '8px'}" @click="handleCancel">
          取消
        </el-button>
        <el-button @click="handleOk('form')" type="primary">确认</el-button>
      </div>
  </el-drawer>
</template>

<script>
import { postApi, putApi } from '@/api/api.js'

  export default {
    data () {
      return {
        title: '',
        visible: false,
        MondayData: [],
        TuesdayData: [],
        WednesdayData: [],
        ThursdayData: [],
        FridayData: [],
        SaturdayData: [],
        SundayData: [],
        // 每天过闸时间
        dailyTime: {
          startTime: '', 
          endTime: '',
        },
        // 保存的每周过闸时间
        Monday: [
          {startTime: '', endTime: ''},
        ],
        Tuesday: [
          {startTime: '', endTime: ''},
        ],
        Wednesday: [
          {startTime: '', endTime: ''},
        ],
        Thursday: [
          {startTime: '', endTime: ''},
        ],
        Friday: [
            {startTime: '', endTime: ''},
        ],
        Saturday: [
          {startTime: '', endTime: ''},
          ],
        Sunday: [
          {startTime: '', endTime: ''},
        ],
        // 发送请求的每周过闸时间
        weekly: {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        },
        typeData: 'weekly',
        model: {},
        form: {
          ruleTimeName: '',
          startTs: '',
          endTs: '',
          count: '',
        },
        rules: {
          ruleTimeName: [
            { required: true, message: '请输入规则名称', trigger: 'blur' }
          ],
          startTs: [
            { required: true, message: '请选择开始日期', trigger: 'blur' }
          ],
          endTs: [
            { required: true,  message: '请选择结束日期', trigger: 'blur' }
          ],
          count: [
            { required: true,  message: '请输入过闸次数', trigger: 'blur' }
          ]
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({})
      },
      edit (row) {
        this.visible = true
        this.model = Object.assign({}, row)
        this.$nextTick(() => {
          if(this.model.id) {
            // 每周时间段回显
            let weekly = JSON.parse(this.model.weekly)
            let Monday = weekly.Monday.split(';')
            let Tuesday = weekly.Tuesday.split(';')
            let Wednesday = weekly.Wednesday.split(';')
            let Thursday = weekly.Thursday.split(';')
            let Friday = weekly.Friday.split(';')
            let Saturday = weekly.Saturday.split(';')
            let Sunday = weekly.Sunday.split(';')
            
            for(let i = 0;i < Monday.length;i++) {
              if(i < Monday.length - 1) {
                this.MondayData.push({startTime: '', endTime: ''})
                this.Monday.push({startTime: '', endTime: ''})
              }
              let time = Monday[i].split('-')
              this.Monday[i].startTime = time[0]
              this.Monday[i].endTime = time[1] 
            }

            for(let i = 0;i < Tuesday.length;i++) {
              if(i < Tuesday.length - 1) {
                this.TuesdayData.push({startTime: '', endTime: ''})
                this.Tuesday.push({startTime: '', endTime: ''})
              }
              let time = Tuesday[i].split('-')
              this.Tuesday[i].startTime = time[0]
              this.Tuesday[i].endTime = time[1] 
            }

            for(let i = 0;i < Wednesday.length;i++) {
              if(i < Wednesday.length - 1) {
                this.WednesdayData.push({startTime: '', endTime: ''})
                this.Wednesday.push({startTime: '', endTime: ''})
              }
              let time = Wednesday[i].split('-')
              this.Wednesday[i].startTime = time[0]
              this.Wednesday[i].endTime = time[1] 
            }

            for(let i = 0;i < Thursday.length;i++) {
              if(i < Thursday.length - 1) {
                this.ThursdayData.push({startTime: '', endTime: ''})
                this.Thursday.push({startTime: '', endTime: ''})
              }
              let time = Thursday[i].split('-')
              this.Thursday[i].startTime = time[0]
              this.Thursday[i].endTime = time[1] 
            }

            for(let i = 0;i < Friday.length;i++) {
              if(i < Friday.length - 1) {
                this.FridayData.push({startTime: '', endTime: ''})
                this.Friday.push({startTime: '', endTime: ''})
              }
              let time = Friday[i].split('-')
              this.Friday[i].startTime = time[0]
              this.Friday[i].endTime = time[1] 
            }

            for(let i = 0;i < Saturday.length;i++) {
              if(i < Saturday.length - 1) {
                this.SaturdayData.push({startTime: '', endTime: ''})
                this.Saturday.push({startTime: '', endTime: ''})
              }
              let time = Saturday[i].split('-')
              this.Saturday[i].startTime = time[0]
              this.Saturday[i].endTime = time[1] 
            }

            for(let i = 0;i < Sunday.length;i++) {
              if(i < Sunday.length - 1) {
                this.SundayData.push({startTime: '', endTime: ''})
                this.Sunday.push({startTime: '', endTime: ''})
              }
              let time = Sunday[i].split('-')
              this.Sunday[i].startTime = time[0]
              this.Sunday[i].endTime = time[1] 
            }
          }

          this.form = {
            ruleTimeName:  this.model.ruleName,
            startTs:  this.model.startTime,
            endTs:  this.model.endTime,
            count:  this.model.count,
          }
        });

      },
      close () {
        this.visible = false
        this.$refs.form.resetFields()
      },
      handleOk (form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            this.getTimePicker()
            let formData = this.form
            formData.weekly = this.weekly
            let res = ''
            if(!this.model.id){
              res = await postApi('addTrafficRulesList', formData)
            }else{
              res = await putApi('editTrafficRulesList', formData)
            }
            console.log(res)
            if(res.success){
              this.$message.success(res.message)
              this.resetDate()
            }else{
              this.$message.warning(res.message)
            }
            this.close()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancel () {
        this.close()
        this.resetDate()
      },
      // 重置日期
      resetDate() {
        this.dailyTime = {
          startTime: '', 
          endTime: '',
        }

        this.MondayData = []
        this.Monday = [{startTime: '', endTime: ''}]

        this.TuesdayData = []
        this.Tuesday = [{startTime: '', endTime: ''}]

        this.WednesdayData = []
        this.Wednesday = [{startTime: '', endTime: ''}]

        this.ThursdayData = []
        this.Thursday = [{startTime: '', endTime: ''}]

        this.FridayData = []
        this.Friday = [{startTime: '', endTime: ''}]

        this.SaturdayData = []
        this.Saturday = [{startTime: '', endTime: ''}]

        this.SundayData = []
        this.Sunday = [{startTime: '', endTime: ''}]

        this.weekly = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        }
      },
      // 添加周一选择器
      MondayPicker() {
        this.MondayData.push({startTime: '', endTime: ''})
        this.Monday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周一选择器
      MondayPickerLess(index) {
        this.MondayData.splice(index, 1)
        this.Monday.splice(index + 1, 1)
      },
      // 添加周二选择器
      TuesdayPicker() {
        this.TuesdayData.push({startTime: '', endTime: ''})
        this.Tuesday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周二选择器
      TuesdayPickerLess(index) {
        this.TuesdayData.splice(index, 1)
        this.Tuesday.splice(index + 1, 1)
      },
      // 添加周三选择器
      WednesdayPicker() {
        this.WednesdayData.push({startTime: '', endTime: ''})
        this.Wednesday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周三选择器
      WednesdayPickerLess(index) {
        this.WednesdayData.splice(index, 1)
        this.Wednesday.splice(index + 1, 1)
      },
      // 添加周四选择器
      ThursdayPicker() {
        this.ThursdayData.push({startTime: '', endTime: ''})
        this.Thursday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周四选择器
      ThursdayPickerLess(index) {
        this.ThursdayData.splice(index, 1)
        this.Thursday.splice(index + 1, 1)
      },
      // 添加周五选择器
      FridayPicker() {
        this.FridayData.push({startTime: '', endTime: ''})
        this.Friday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周五选择器
      FridayPickerLess(index) {
        this.FridayData.splice(index, 1)
        this.Friday.splice(index + 1, 1)
      },
      // 添加周六选择器
      SaturdayPicker() {
        this.SaturdayData.push({startTime: '', endTime: ''})
        this.Saturday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周六选择器
      SaturdayPickerLess(index) {
        this.SaturdayData.splice(index, 1)
        this.Saturday.splice(index + 1, 1)
      },
      // 添加周日选择器
      SundayPicker() {
        this.SundayData.push({startTime: '', endTime: ''})
        this.Sunday.push({startTime: '', endTime: ''})
      },
      // 减去当前选中周日选择器
      SundayPickerLess(index) {
        this.SundayData.splice(index, 1)
        this.Sunday.splice(index + 1, 1)
      },
      // 获取发送的时间段
      getTimePicker() {
        // 时间段获取
            if(this.dailyTime.startTime && this.dailyTime.endTime) {
              let time = this.dailyTime.startTime + '-' + this.dailyTime.endTime
              this.weekly.Monday.push(time)
              this.weekly.Tuesday.push(time)
              this.weekly.Wednesday.push(time)
              this.weekly.Thursday.push(time)
              this.weekly.Friday.push(time)
              this.weekly.Saturday.push(time)
              this.weekly.Sunday.push(time)

              for(let i = 0;i < this.Monday.length;i++) {
                if(this.Monday[i].startTime && this.Monday[i].endTime) {
                  let time = this.Monday[i].startTime + '-' + this.Monday[i].endTime
                  this.weekly.Monday.push(time)
                }
              }
              this.weekly.Monday = this.weekly.Monday.join(';')

              for(let i = 0;i < this.Tuesday.length;i++) {
                if(this.Tuesday[i].startTime && this.Tuesday[i].endTime) {
                  let time = this.Tuesday[i].startTime + '-' + this.Tuesday[i].endTime
                  this.weekly.Tuesday.push(time)
                }
              }
              this.weekly.Tuesday = this.weekly.Tuesday.join(';')

              for(let i = 0;i < this.Wednesday.length;i++) {
                if(this.Wednesday[i].startTime && this.Wednesday[i].endTime) {
                  let time = this.Wednesday[i].startTime + '-' + this.Wednesday[i].endTime
                  this.weekly.Wednesday.push(time)
                }
              }
              this.weekly.Wednesday = this.weekly.Wednesday.join(';')

              for(let i = 0;i < this.Thursday.length;i++) {
                if(this.Thursday[i].startTime && this.Thursday[i].endTime) {
                  let time = this.Thursday[i].startTime + '-' + this.Thursday[i].endTime
                  this.weekly.Thursday.push(time)
                }
              }
              this.weekly.Thursday = this.weekly.Thursday.join(';')

              for(let i = 0;i < this.Friday.length;i++) {
                if(this.Friday[i].startTime && this.Friday[i].endTime) {
                  let time = this.Friday[i].startTime + '-' + this.Friday[i].endTime
                  this.weekly.Friday.push(time)
                }
              }
              this.weekly.Friday = this.weekly.Friday.join(';')

              for(let i = 0;i < this.Saturday.length;i++) {
                if(this.Saturday[i].startTime && this.Saturday[i].endTime) {
                  let time = this.Saturday[i].startTime + '-' + this.Saturday[i].endTime
                  this.weekly.Saturday.push(time)
                }
              }
              this.weekly.Saturday = this.weekly.Saturday.join(';')

              for(let i = 0;i < this.Sunday.length;i++) {
                if(this.Sunday[i].startTime && this.Sunday[i].endTime) {
                  let time = this.Sunday[i].startTime + '-' + this.Sunday[i].endTime
                  this.weekly.Sunday.push(time)
                }
              }
              this.weekly.Sunday = this.weekly.Sunday.join(';')
            }else {
              for(let i = 0;i < this.Monday.length;i++) {
                if(this.Monday[i].startTime && this.Monday[i].endTime) {
                  let time = this.Monday[i].startTime + '-' + this.Monday[i].endTime
                  this.weekly.Monday.push(time)
                }
              }
              this.weekly.Monday = this.weekly.Monday.join(';')

              for(let i = 0;i < this.Tuesday.length;i++) {
                if(this.Tuesday[i].startTime && this.Tuesday[i].endTime) {
                  let time = this.Tuesday[i].startTime + '-' + this.Tuesday[i].endTime
                  this.weekly.Tuesday.push(time)
                }
              }
              this.weekly.Tuesday = this.weekly.Tuesday.join(';')

              for(let i = 0;i < this.Wednesday.length;i++) {
                if(this.Wednesday[i].startTime && this.Wednesday[i].endTime) {
                  let time = this.Wednesday[i].startTime + '-' + this.Wednesday[i].endTime
                  this.weekly.Wednesday.push(time)
                }
              }
              this.weekly.Wednesday = this.weekly.Wednesday.join(';')

              for(let i = 0;i < this.Thursday.length;i++) {
                if(this.Thursday[i].startTime && this.Thursday[i].endTime) {
                  let time = this.Thursday[i].startTime + '-' + this.Thursday[i].endTime
                  this.weekly.Thursday.push(time)
                }
              }
              this.weekly.Thursday = this.weekly.Thursday.join(';')

              for(let i = 0;i < this.Friday.length;i++) {
                if(this.Friday[i].startTime && this.Friday[i].endTime) {
                  let time = this.Friday[i].startTime + '-' + this.Friday[i].endTime
                  this.weekly.Friday.push(time)
                }
              }
              this.weekly.Friday = this.weekly.Friday.join(';')

              for(let i = 0;i < this.Saturday.length;i++) {
                if(this.Saturday[i].startTime && this.Saturday[i].endTime) {
                  let time = this.Saturday[i].startTime + '-' + this.Saturday[i].endTime
                  this.weekly.Saturday.push(time)
                }
              }
              this.weekly.Saturday = this.weekly.Saturday.join(';')

              for(let i = 0;i < this.Sunday.length;i++) {
                if(this.Sunday[i].startTime && this.Sunday[i].endTime) {
                  let time = this.Sunday[i].startTime + '-' + this.Sunday[i].endTime
                  this.weekly.Sunday.push(time)
                }
              }
              this.weekly.Sunday = this.weekly.Sunday.join(';')
            }
      },
    }
  }
</script>

<style lang='scss' scoped>
// 抽屉标题
/deep/ .el-drawer__header {
  font-size: 30px;
  font-weight: bold;
  color: #21252b;
  border-bottom: 1px solid #dcdfe6;
  padding-left: 15px;
  margin-bottom: 20px;
} 
.type-box {
  margin-bottom: 20px;
}
.type-title {
  margin-right: 20px;
}

.item-box {
  height: 60px;
}

.week-title {
  float: left;
  width: 76px;
}

.picker-box {
  float: left;
}

.el-icon-plus {
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
}
.el-icon-minus {
  color: red;
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
}
/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
/deep/ .el-drawer__body {
    overflow: auto;
    margin-bottom: 50px;
}

/*2.隐藏滚动条*/
/deep/ .el-drawer__container ::-webkit-scrollbar{
    display: none;
}
</style>