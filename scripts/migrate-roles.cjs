/**
 * One-time migration script: Updates all route files from old 22-role system
 * to new 5-role system.
 *
 * Usage: node scripts/migrate-roles.cjs
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const OLD_TO_NEW = {
  // Exact matches (same role name)
  'super-admin': 'super-admin',
  faculty: 'faculty',
  student: 'student',

  // Old admin roles -> domain-admin
  admin: 'domain-admin',
  registrar: 'domain-admin',
  principal: 'domain-admin',
  'vice-principal': 'domain-admin',
  hod: 'domain-admin',
  chairman: 'domain-admin',

  // Old staff sub-roles -> staff
  guard: 'staff',
  warden: 'staff',
  'mess-manager': 'staff',
  accountant: 'staff',
  librarian: 'staff',
  doctor: 'staff',
  counselor: 'staff',
  maintenance: 'staff',
  parent: 'staff',
  receptionist: 'staff',
  nurse: 'staff',
  'lab-technician': 'staff',
  pharmacist: 'staff',
};

const ROOT_DIR = path.resolve(__dirname, '..');
const ROUTE_DIR = path.resolve(ROOT_DIR, 'src', 'app', 'modules');

function deduplicateRoles(roles) {
  const seen = new Set();
  return roles.filter(r => {
    if (seen.has(r)) return false;
    seen.add(r);
    return true;
  });
}

function updateRouteFile(absPath, relPath) {
  let content = fs.readFileSync(absPath, 'utf8');
  let modified = false;

  function transformRoleList(tokens) {
    const newTokens = [];
    for (const token of tokens) {
      const trimmed = token.trim();
      const matchRole = trimmed.match(/^'(.*)'$/);
      if (matchRole) {
        const oldRole = matchRole[1];
        const newRole = OLD_TO_NEW[oldRole];
        if (newRole) {
          newTokens.push(`'${newRole}'`);
          if (newRole !== oldRole) modified = true;
        } else if (oldRole === 'super-admin' || oldRole === 'faculty' || oldRole === 'student') {
          newTokens.push(trimmed);
        } else {
          console.warn(`  ⚠ Unknown role '${oldRole}' in ${relPath}`);
          newTokens.push(trimmed);
        }
      } else {
        // Not a string literal — keep as-is
        newTokens.push(trimmed);
      }
    }
    return deduplicateRoles(newTokens);
  }

  // Match auth('role1', 'role2', ...) patterns
  content = content.replace(
    /auth\(([^)]*)\)/g,
    (match, argsStr) => {
      const tokens = argsStr.split(',').map(t => t.trim());
      const deduped = transformRoleList(tokens);
      return `auth(${deduped.join(', ')})`;
    }
  );

  // Match role arrays: createRoles: ['role1', 'role2']
  content = content.replace(
    /(createRoles|readRoles|updateRoles|deleteRoles):\s*\[([^\]]*)\]/g,
    (match, key, arrayStr) => {
      const tokens = arrayStr.split(',').map(t => t.trim());
      const deduped = transformRoleList(tokens);
      return `${key}: [${deduped.join(', ')}]`;
    }
  );

  if (modified) {
    fs.writeFileSync(absPath, content, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = glob.sync('src/app/modules/**/*.route?(s).ts', { cwd: ROOT_DIR });
  let updated = 0;
  let skipped = 0;

  console.log(`Found ${files.length} route files. Processing...\n`);

  for (const file of files) {
    const fullPath = path.join(ROOT_DIR, file);
    const changed = updateRouteFile(fullPath, file);
    if (changed) {
      console.log(`  ✓ ${file}`);
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\nDone! ${updated} files updated, ${skipped} files unchanged.`);
}

main();
