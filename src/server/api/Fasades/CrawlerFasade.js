class DataSourceFacade {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async crawlData() {
    return await this.dataSource.crawlData();
  }
}

module.exports = DataSourceFacade;
