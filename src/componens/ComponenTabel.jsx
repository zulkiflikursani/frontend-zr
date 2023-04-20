import React from "react";

export const ComponenTabel = (colom, data) => {
  colom.map((item) => {
    <th>item.nama</th>;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>{colom}</tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
