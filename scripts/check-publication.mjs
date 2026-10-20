import assert from 'node:assert/strict';
import {legalDetails,legalOpenItems,legalDraft} from '../src/legal-details.js';
import {siteConfig} from '../site.config.mjs';
assert.ok(legalDetails.postalAddress.length>=2,'Publication blocked: complete postal address is missing.');
if(process.env.GITHUB_REPOSITORY)assert.equal(process.env.GITHUB_REPOSITORY.toLowerCase(),siteConfig.repository.toLowerCase(),'This workflow is prepared only for the new kc repository.');
if(legalDraft)console.warn('Datenschutz remains a draft; completion deferred by the owner on 2026-10-20.\n'+legalOpenItems.join('\n'));
console.log('Publication target checked: '+siteConfig.repository+'. This command does not publish or record owner approval.');
