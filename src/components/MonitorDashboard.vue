<template>
  <div>
    <div>
      <h1>Welcome to the SuperMap iSPECO Team site!</h1>
      <p>欢迎来到 SuperMap iSPECO 团队站点</p>
      <p>创新，发展，超越......</p>
      <p>精益求精，敏捷高效，开放创新，信任透明，成就自我......</p>
      <p>iServer、iPortal、iEdge、iClient、Online、iManager，这就是iSPECOM......</p>
      <div style="margin-bottom: 15px">
        <label>状态：</label>
        <a-checkbox-group :options="statusOptions" v-model="checkedList" @change="statusChange"/>
      </div>
    </div>
    <a-list :loading="loading" :grid="{gutter:24,xl:6,lg:3,md:3,sm:2,xs:1}" :dataSource="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.name">
          <p>
            状态：
            <a-badge style="margin-left:5px" :status="getStatus(item)" :text="getStatusText(item)"/>
          </p>
          <p class="address">
            <a :href="item.url">{{ item.url }}</a>
          </p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import axios from "axios";
let statusType = {
  ONLINE: {
    label: "正常",
    value: "ONLINE"
  },
  OFFLINE: {
    label: "异常",
    value: "OFFLINE"
  },
  UNKNOWN: {
    label: "检测中",
    value: "UNKNOWN"
  }
};
export default {
  name: "MonitoreDashboard",
  data() {
    return {
      list: [],
      loading: true,
      statusOptions: Object.values(statusType),
      checkedList: Object.keys(statusType),
      datasources: []
    };
  },
  methods: {
    getAccount() {
      let _self = this;
      axios.get("/account").then(response => {
        _self.login(response.data);
      });
    },
    login(account) {
      let _self = this;
      axios({
        method: "post",
        url: "/imanager/security/tokens.json",
        data: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        _self.getWebScenario();
      });
    },
    getWebScenario() {
      let _self = this;
      axios.get("/imanager/web/api/service/webScenario.json").then(response => {
        _self.datasources = response.data.list;
        _self.statusChange(_self.checkedList);
      });
    },
    initPage() {
      this.getAccount();
    },
    getStatus(record) {
      if (record.status === statusType.ONLINE.value) {
        return "success";
      } else if (record.status === statusType.OFFLINE.value) {
        return "error";
      }
      return "default";
    },
    getStatusText(record) {
      if (record.status === statusType.ONLINE.value) {
        return "正常";
      } else if (record.status === statusType.OFFLINE.value) {
        return "异常";
      }
      return "检测中";
    },
    statusChange(checkedList) {
      if (checkedList.length === this.statusOptions.length) {
        this.list = this.datasources;
        this.loading = false;
        return;
      }
      let result = [];
      this.datasources.forEach(element => {
        if (checkedList.indexOf(element.status) > -1) {
          result.push(element);
        }
      });
      this.list = result;
    }
  },
  mounted() {
    let _self = this;
    _self.initPage();
    setInterval(() => {
      _self.getWebScenario();
    }, 60000);
  }
};
</script>

<style>
.address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>