import { Routes } from '@angular/router';
import { ContextWindowPage } from './e01-its-all-about-context/context-window.page';
import { PlanModeTheBetterWayPage } from './e02-the-plan-mode/plan-mode-the-better-way.page';
import {
  UsingSkillsAndMoreAboutContextPage
} from './e03-simple-best-skill-ever/using-skills-and-more-about-context.page';
import { McpServerListPage } from './e04-mcp-servers-for-frontend/mcp-server-list.page';
import { SpecDrivenAiDevProcessPage } from './e05-pros-and-cons-of-spec-driven-dev/spec-driven-ai-dev-process.page';
import { ProjectIntegrationPage } from './e06-integration-into-existing-app/project-integration.page';

export const partERoutes: Routes = [
  { path: 'e-context-window', component: ContextWindowPage },
  { path: 'e-plan-mode', component: PlanModeTheBetterWayPage },
  { path: 'e-grill-me-skill', component: UsingSkillsAndMoreAboutContextPage },
  { path: 'e-mcp-servers', component: McpServerListPage },
  { path: 'e-spec-driven-pros-and-cons', component: SpecDrivenAiDevProcessPage },
  { path: 'e-integration', component: ProjectIntegrationPage },
];
