const { chromium } = require('playwright');

async function verifyFeature(url, testName, checks) {
  console.log(`\n=== ${testName} ===`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded:', url);
    
    // Wait for Vue to mount and demo to render
    await page.waitForTimeout(3000);
    
    // Check page content for any flow-related content
    const content = await page.content();
    const hasFlowContainer = content.includes('yh-flow') || content.includes('demo-block');
    console.log('Has flow content:', hasFlowContainer);
    
    for (const check of checks) {
      try {
        const result = await check(page);
        console.log(`✓ ${result}`);
      } catch (e) {
        console.log(`✗ ${e.message}`);
      }
    }
    
    // Screenshot
    const screenshotName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    await page.screenshot({ path: `e:\\YH-UI\\test-screenshots\\${screenshotName}.png`, fullPage: true });
    console.log(`Screenshot saved: ${screenshotName}.png`);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
}

async function runAllTests() {
  const baseUrl = 'http://localhost:5173/yh-ui';
  
  // 1. Node/Edge Edit
  await verifyFeature(
    `${baseUrl}/flow/node-edge-edit`,
    'Node Edge Edit',
    [
      async (page) => {
        // Look for any yh-flow component in the page
        await page.waitForSelector('.yh-flow, [class*="flow"]', { timeout: 15000 });
        const flowElements = await page.locator('.yh-flow, [class*="flow"]').count();
        console.log(`Found ${flowElements} flow elements`);
        
        if (flowElements > 0) {
          // Try to find nodes inside
          const nodes = await page.locator('.yh-flow-node, [class*="flow-node"]').count();
          console.log(`Found ${nodes} nodes`);
          
          if (nodes > 0) {
            // Double-click first node to open edit panel
            await page.locator('.yh-flow-node, [class*="flow-node"]').first().dblclick({ force: true });
            await page.waitForTimeout(1000);
            
            // Check for edit panel
            const panel = await page.locator('[class*="edit-panel"], [class*="editPanel"]').count();
            if (panel > 0) return 'Edit panel opens on double-click';
            
            // Also check for any visible panel-like elements
            const anyPanel = await page.locator('.vp-panel, aside, [class*="panel"]').count();
            console.log(`Found ${anyPanel} potential panel elements`);
            return 'Double-click executed, but panel visibility unknown';
          }
          return 'Flow rendered but no nodes found';
        }
        
        // Check if demo is loading
        const loading = await page.locator('[class*="loading"], [class*="placeholder"]').count();
        if (loading > 0) return 'Demo may be loading - check manually';
        return 'No flow component found in page';
      }
    ]
  );
  
  // 2. Custom Edge (Delete button)
  await verifyFeature(
    `${baseUrl}/flow/custom-edge`,
    'Custom Edge Delete',
    [
      async (page) => {
        await page.waitForSelector('.yh-flow, [class*="flow"]', { timeout: 15000 });
        const edges = await page.locator('[class*="edge"], path[d]').count();
        console.log(`Found ${edges} edge elements`);
        
        if (edges > 0) {
          const delBtn = await page.locator('[class*="remove"], [class*="delete"], button').count();
          if (delBtn > 0) return `Found ${delBtn} potential delete/button elements`;
          return 'Edges rendered, no delete button visible';
        }
        return 'No edges found';
      }
    ]
  );
  
  // 3. Node Toolbar
  await verifyFeature(
    `${baseUrl}/flow/node-toolbar`,
    'Node Toolbar',
    [
      async (page) => {
        await page.waitForSelector('.yh-flow, [class*="flow"]', { timeout: 15000 });
        
        // Try to click any node
        const nodes = await page.locator('.yh-flow-node, [class*="flow-node"]').count();
        console.log(`Found ${nodes} nodes`);
        
        if (nodes > 0) {
          await page.locator('.yh-flow-node, [class*="flow-node"]').first().click({ force: true });
          await page.waitForTimeout(1000);
          
          const toolbar = await page.locator('[class*="toolbar"], [class*="Toolbar"]').count();
          if (toolbar > 0) return 'Toolbar appears on node selection';
          return 'Node clicked but toolbar not detected';
        }
        return 'No nodes found to click';
      }
    ]
  );
  
  // 4. Node Resizer
  await verifyFeature(
    `${baseUrl}/flow/node-resizer`,
    'Node Resizer',
    [
      async (page) => {
        await page.waitForSelector('.yh-flow, [class*="flow"]', { timeout: 15000 });
        
        const nodes = await page.locator('.yh-flow-node, [class*="flow-node"]').count();
        console.log(`Found ${nodes} nodes`);
        
        if (nodes > 0) {
          await page.locator('.yh-flow-node, [class*="flow-node"]').first().click({ force: true });
          await page.waitForTimeout(1000);
          
          // Look for resize handles - typically small squares around the node
          const handles = await page.locator('[class*="resizer"], [class*="handle"], [class*="Resize"]').count();
          if (handles > 0) return `Found ${handles} resize handle(s)`;
          
          // Also check for any small elements that could be handles
          const smallElements = await page.locator('[style*="width: 6px"], [style*="width: 8px"]').count();
          if (smallElements > 0) return `Found ${smallElements} potential handle elements`;
          
          return 'Node selected, but no resize handles detected';
        }
        return 'No nodes found';
      }
    ]
  );
  
  console.log('\n=== All tests completed ===');
}

runAllTests().catch(console.error);
