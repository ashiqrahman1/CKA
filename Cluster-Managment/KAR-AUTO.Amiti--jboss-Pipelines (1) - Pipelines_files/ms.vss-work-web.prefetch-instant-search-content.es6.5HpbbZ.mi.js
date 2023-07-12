"use strict";define("Wit/Search/PrefetchContent",["require","exports","VSS/Core/TimerManagement","VSS/Platform/Context"],(function(e,t,i,s){!function(e){t[e]={};class r extends s.VssService{constructor(){super(...arguments),this._isWorkItemProviderSelected=!1,this._isWikiProviderSelected=!1,this._shouldPrefetch=!1,this._areInstantSearchScriptsFetched=!1,this._fetchRecentWorkItemsData=()=>this.pageContext.getService("IVssContributionService").getDataAsync("ms.vss-work-web.workitem-search-recent-activity-data-provider",void 0,!0).then((e=>(this._recentWorkItemsCache=e,this._recentWorkItemsCache))),this._fetchRecentWikiPagesData=()=>this.pageContext.getService("IVssContributionService").getDataAsync("ms.vss-wiki-web.wikipage-recent-activity-data-provider",void 0,!0).then((e=>(this._recentWikiPagesCache=e,this._recentWikiPagesCache)))}get isProjectContext(){if(null==this._isProjectContext){const e=this.pageContext.getService("ITfsPageService").getData();this._isProjectContext=!(!e||!e.project)}return this._isProjectContext}get menuContributionId(){return this._menuContributionId||(this.isProjectContext?this._menuContributionId="ms.vss-work-web.instant-search-project-menu":this._menuContributionId="ms.vss-work-web.instant-search-collection-menu"),this._menuContributionId}_serviceStart(e){super._serviceStart(e),this._initialize()}_serviceRestart(e){super._serviceRestart(e),this._initialize()}fetchInstantSearchContent(){this._shouldPrefetch&&(this._shouldPrefetch=!1,this._areInstantSearchScriptsFetched||(this._areInstantSearchScriptsFetched=!0,this._fetchInstantSearchScripts(),this._fetchInstantSearchMenuContribution()),!this._recentWorkItemsCache&&this._isWorkItemProviderSelected&&this._fetchRecentWorkItemsData(),!this._recentWikiPagesCache&&this._isWikiProviderSelected&&this._fetchRecentWikiPagesData())}cacheRecentWorkItemsData(){this._throttledCacheRecentWorkItemsData()}cacheRecentWikiPagesData(){this._throttledCacheRecentWikiPagesData()}get recentWorkItemsCache(){return this._recentWorkItemsCache?Promise.resolve(this._recentWorkItemsCache):this._fetchRecentWorkItemsData()}get recentWikiPagesCache(){return this._recentWikiPagesCache?Promise.resolve(this._recentWikiPagesCache):this._fetchRecentWikiPagesData()}_initialize(){const e=this.pageContext.getService("IVssSearchService").getSelectedProvider();this._isWorkItemProviderSelected="ms.vss-work-web.workitem-project-search-provider"===e||"ms.vss-work-web.workitem-collection-search-provider"===e,this._isWikiProviderSelected="ms.vss-wiki-web.wiki-project-search-provider"===e,this._shouldPrefetch=this._isWorkItemProviderSelected||this._isWikiProviderSelected,this._throttledCacheRecentWorkItemsData=(new i.TimerManagement).throttle(this._fetchRecentWorkItemsData,100),this._throttledCacheRecentWikiPagesData=(new i.TimerManagement).throttle(this._fetchRecentWikiPagesData,100)}_fetchInstantSearchScripts(){const e=this.pageContext.getService("IVssContributionService");e.getContributionsAsync(["ms.vss-work-web.search-content"]),e.getContributionsAsync(["ms.vss-wiki-web.wiki-search-content"])}_fetchInstantSearchMenuContribution(){this.pageContext.getService("IVssContributionService").getContributionAsync(this.menuContributionId)}}t[e].PrefetchInstantSearchContentService=r,s.Services.add("IPrefetchInstantSearchContentService",{serviceFactory:r,options:2})}("PrefetchInstantSearchContentService")}),["PrefetchInstantSearchContentService"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-work-web.prefetch-instant-search-content"}}));