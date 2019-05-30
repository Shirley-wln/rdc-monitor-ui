<template>
  <div>
    <div>
      <h1>Welcome to the SuperMap iSPECO Team site!</h1>
      <p>欢迎来到 SuperMap iSPECO 团队站点</p>
      <p>创新，发展，超越......</p>
      <p>精益求精，敏捷高效，开放创新，信任透明，成就自我......</p>
      <p>iServer、iPortal、iExpress、iCloudManager、Online，这就是iSPECO......</p>
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
export default {
  name: "MonitoreDashboard",
  data() {
    return {
      list: [],
      loading: true
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
        _self.list = response.data.list;
        _self.loading = false;
      });
    },
    initPage() {
      this.getAccount();
    },
    getStatus(record) {
      if (record.status === "ONLINE") {
        return "success";
      } else if (record.status === "OFFLINE") {
        return "error";
      }
      return "default";
    },
    getStatusText(record) {
      if (record.status === "ONLINE") {
        return "正常";
      } else if (record.status === "OFFLINE") {
        return "异常";
      }
      return "检测中";
    }
  },
  mounted() {
    this.initPage();
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