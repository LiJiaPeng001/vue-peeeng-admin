<template>
  <table>
    <tbody>
      <tr class="ant-descriptions-row">
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Product</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>Cloud Database</span></td>
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Billing Mode</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>Prepaid</span></td>
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Automatic Renewal</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>YES</span></td>
      </tr>
      <tr class="ant-descriptions-row">
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Order time</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>2018-04-24 18:00:00</span></td>
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Usage Time</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="3"><!----><span>2019-04-24 18:00:00</span></td>
      </tr>
      <tr class="ant-descriptions-row">
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Status</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="5">
          <!----><span
            ><span class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
              ><span class="ant-badge-status-dot ant-badge-status-processing"></span><span class="ant-badge-status-text">Running</span></span
            ></span
          >
        </td>
      </tr>
      <tr class="ant-descriptions-row">
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Negotiated Amount</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>$80.00</span></td>
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Discount</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>$20.00</span></td>
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Official Receipts</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="1"><!----><span>$60.00</span></td>
      </tr>
      <tr class="ant-descriptions-row">
        <th class="ant-descriptions-item-label" colspan="1">
          <span>Config Info</span
          ><!---->
        </th>
        <td class="ant-descriptions-item-content" colspan="5">
          <!----><span>
            Data disk type: MongoDB <br />
            Database version: 3.4 <br />
            Package: dds.mongo.mid <br />
            Storage space: 10 GB <br />
            Replication factor: 3 <br />
            Region: East China 1 <br
          /></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import type { TableColumnsType } from "ant-design-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const columns = ref<TableColumnsType>([
      {
        title: "Full Name",
        width: 100,
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
      {
        title: "Age",
        width: 100,
        dataIndex: "age",
        key: "age",
        fixed: "left",
      },
      {
        title: "Column 1",
        dataIndex: "address",
        key: "1",
        width: 150,
      },
      {
        title: "Column 2",
        dataIndex: "address",
        key: "2",
        width: 150,
      },
      {
        title: "Column 3",
        dataIndex: "address",
        key: "3",
        width: 150,
      },
      {
        title: "Column 4",
        dataIndex: "address",
        key: "4",
        width: 150,
      },
      {
        title: "Column 5",
        dataIndex: "address",
        key: "5",
        width: 150,
      },
      {
        title: "Column 6",
        dataIndex: "address",
        key: "6",
        width: 150,
      },
      {
        title: "Column 7",
        dataIndex: "address",
        key: "7",
        width: 150,
      },
      { title: "Column 8", dataIndex: "address", key: "8" },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
      },
    ]);

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    return {
      data,
      columns,
      fixedTop: ref(false),
    };
  },
});
</script>
<style>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme="dark"] #components-table-demo-summary tfoot th,
[data-theme="dark"] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>
