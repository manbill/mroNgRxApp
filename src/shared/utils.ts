export class MroUtils {
  static changeDbResult2Array(res) {
    const results = [];
    if (res.rows.length > 0) {
      for (let i = 0; i < res.rows.length; i++) {
        results.push(res.rows.item(i));
      }
    }
    return results;
  }
}
