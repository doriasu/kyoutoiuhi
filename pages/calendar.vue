<template>
  <div>
    <h2>かれんだー{{ currentDate.month() + 1 }}月</h2>
    <button @click="prevMonth">前の月</button>
    <button @click="nextMonth">次の月</button>
    <div style="max-width: 900px; border-top: 1px solid">
      <div
        v-for="(week, index) in calendars"
        :key="index"
        style="display: flex; border-left: 1px solid"
      >
        <div class="cell" v-for="(day, index) in week" :key="index">
          {{ day.date }}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import moment from "moment";
import data from "assets/sample.json";
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      currentDate: moment(),
      commentData: data["data"],
    };
  },
  computed: {
    calendars():{[name:string]:Number}[][] {
      return this.getCalendar();
    },

  },
  methods: {
    getStartDate():moment.Moment {
      let date = moment(this.currentDate);
      //monthを入れると月の最初の日になる
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate():moment.Moment {
      let date = moment(this.currentDate);  
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar():{[name:string]:Number}[][] {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars:{[name:string]:Number}[][] = [];
      for (let week = 0; week < weekNumber; week++) {
        let weekRow:{[name:string]:Number}[] = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            "date": startDate.get("date"),
          });
          startDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
      return;
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
      return;
    },
  },
  mounted() {},
});
</script>
<style>
.cell {
  flex: 1;
  min-height: 100px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
</style>