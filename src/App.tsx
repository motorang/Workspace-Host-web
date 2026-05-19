import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { 
  MoreHorizontal, Search, X, Plus, 
  Lock, Check, Trash2, ChevronDown, Home, Layout, 
  Shield, Copy, ClipboardPaste, Info, Pencil, Pin,
  ChevronLeft, LayoutGrid, AlertCircle, ChevronRight, Eye, Ban, Archive, Camera, Globe
} from 'lucide-react';

const DICT: Record<string, Record<string, string>> = {
  vi: {
    'Owner': 'Chủ sở hữu', 'Admin': 'Quản trị', 'Default': 'Mặc định', 'Custom': 'Tùy chỉnh', 'Pinned': 'Ghim', 'Pin': 'Ghim', 'Unpin': 'Bỏ ghim', 'Recents': 'Gần đây',
    'View all workspaces': 'Xem tất cả', 'Create workspace': 'Tạo workspace', 'Applies to tasks': 'Áp dụng với công việc', 'All items': 'Tất cả nội dung', 'Applies to all items': 'Quyền áp dụng với tất cả nội dung',
    'Own items': 'Nội dung tự tạo', 'Assigned tasks': 'Công việc được giao', 'Add member': 'Thêm thành viên', 'Workspace': 'Workspace', 'Language': 'Ngôn ngữ', 'Manage workspace': 'Cài đặt workspace',
    'Manage members': 'Quản lý thành viên', 'Remove': 'Xóa', 'Update': 'Chỉnh sửa', 'Details': 'Thông tin chung', 'Workspace name': 'Tên workspace', 'Description': 'Mô tả', 'Members': 'Thành viên',
    'Delete workspace': 'Xóa workspace', 'Are you sure you want to remove this member?': 'Bạn có chắc muốn xóa thành viên này?', 'Are you sure you want to delete this workspace?': 'Bạn có chắc muốn xóa workspace này?',
    'Cancel': 'Hủy', 'Confirm': 'Xác nhận', 'Active': 'Hoạt động', 'Disabled': 'Vô hiệu hóa', 'Archived': 'Lưu trữ', 'Status': 'Trạng thái', 'Creator': 'Người tạo', 'Action': 'Thao tác',
    'View details': 'Xem chi tiết', 'Edit': 'Chỉnh sửa', 'All': 'Tất cả', 'Search users...': 'Tìm kiếm thành viên...', 'Done': 'Hoàn tất', 'New': 'Mới thêm', 'My tasks': 'Công việc của tôi',
    'Home': 'Trang chủ', 'Task management': 'Quản lý công việc', 'Workspace list': 'Danh sách workspace', 'Create new workspace': 'Tạo Workspace mới', 'No recent workspace': 'Chưa có workspace truy cập gần đây',
    'Max 5 pinned': 'Bạn chỉ có thể ghim tối đa 5 workspaces.', 'Pinned success': 'Đã ghim Workspace thành công.', 'Unpinned success': 'Đã bỏ ghim Workspace.', 'Created success': 'Tạo Workspace thành công.',
    'Deleted success': 'Đã xoá Workspace.', 'Status changed': 'Đã thay đổi trạng thái Workspace.', 'Internal workspace': 'Workspace nội bộ', 'Display area': 'Khu vực hiển thị danh sách công việc, bảng Kanban, v.v.',
    'Use menu': 'Sử dụng nút ... ở góc trên bên phải để trải nghiệm luồng Phân quyền & Setting.', 'No more users': 'Không còn user nào để thêm.', 'Enter workspace name': 'Nhập tên workspace', 'Enter description': 'Nhập mô tả',
    'No description': 'Không có mô tả', 'Allowed formats': 'Cho phép: PNG, JPEG. Tối đa 1 MB.', 'Workspace details': 'Chi tiết workspace', 'Manage permissions': 'Quản lý thành viên & Phân quyền',
    'Copy permissions': 'Copy quyền', 'Paste permissions': 'Dán quyền', 'Remove member': 'Xóa thành viên', 'Transfer Owner': 'Chuyển Owner', 'Select member': '-- Chọn thành viên --',
    'Save permissions': 'Lưu phân quyền', 'Holding copied permissions': 'Đang giữ quyền đã copy', 'Add new member': 'Thêm thành viên mới', 'Edit permissions': 'Chỉnh sửa phân quyền', 'Member': 'Thành viên',
    'Admin access': 'Quản trị viên: Quản lý member, cấu hình quyền', 'Create': 'Tạo', 'Assign': 'Giao việc', 'Delete': 'Xóa', 'Space': 'Workspace', 'Enable': 'Mở lại', 'Unarchive': 'Khôi phục',
    'Transfer ownership desc': 'Vui lòng chọn thành viên bạn muốn chuyển quyền sở hữu. <b>Tài khoản của bạn sẽ được tự động đưa về quyền mặc định kèm theo quyền Admin.</b>', 'Avatar': 'Hình ảnh đại diện',
    'Save info': 'Lưu thông tin', 'Cancel edit': 'Huỷ sửa', 'New members': 'Thành viên mới'
  },
  en: {
    'Owner': 'Owner', 'Admin': 'Admin', 'Default': 'Default', 'Custom': 'Custom', 'Pinned': 'Pinned', 'Pin': 'Pin', 'Unpin': 'Unpin', 'Recents': 'Recents',
    'View all workspaces': 'View all workspaces', 'Create workspace': 'Create workspace', 'Applies to tasks': 'Applies to tasks', 'All items': 'All items', 'Applies to all items': 'Applies to all items',
    'Own items': 'Own items', 'Assigned tasks': 'Assigned tasks', 'Add member': 'Add member', 'Workspace': 'Workspace', 'Language': 'Language', 'Manage workspace': 'Workspace settings',
    'Manage members': 'Manage members', 'Remove': 'Remove', 'Update': 'Update', 'Details': 'General info', 'Workspace name': 'Workspace name', 'Description': 'Description', 'Members': 'Members',
    'Delete workspace': 'Delete workspace', 'Are you sure you want to remove this member?': 'Are you sure you want to remove this member?', 'Are you sure you want to delete this workspace?': 'Are you sure you want to delete this workspace?',
    'Cancel': 'Cancel', 'Confirm': 'Confirm', 'Active': 'Active', 'Disabled': 'Disabled', 'Archived': 'Archived', 'Status': 'Status', 'Creator': 'Creator', 'Action': 'Action',
    'View details': 'View details', 'Edit': 'Edit', 'All': 'All', 'Search users...': 'Search users...', 'Done': 'Done', 'New': 'New', 'My tasks': 'My tasks',
    'Home': 'Home', 'Task management': 'Task management', 'Workspace list': 'Workspace list', 'Create new workspace': 'Create new workspace', 'No recent workspace': 'No recent workspaces',
    'Max 5 pinned': 'You can only pin up to 5 workspaces.', 'Pinned success': 'Pinned workspace successfully.', 'Unpinned success': 'Unpinned workspace.', 'Created success': 'Workspace created successfully.',
    'Deleted success': 'Workspace deleted.', 'Status changed': 'Workspace status changed.', 'Internal workspace': 'Internal workspace', 'Display area': 'Display area for tasks, Kanban boards, etc.',
    'Use menu': 'Use the ... button in the top right to experience the Permissions & Settings flow.', 'No more users': 'No more users to add.', 'Enter workspace name': 'Enter workspace name', 'Enter description': 'Enter description',
    'No description': 'No description', 'Allowed formats': 'Allowed: PNG, JPEG. Max 1 MB.', 'Workspace details': 'Workspace details', 'Manage permissions': 'Manage members & permissions',
    'Copy permissions': 'Copy permissions', 'Paste permissions': 'Paste permissions', 'Remove member': 'Remove member', 'Transfer Owner': 'Transfer Owner', 'Select member': '-- Select member --',
    'Save permissions': 'Save permissions', 'Holding copied permissions': 'Holding copied permissions', 'Add new member': 'Add new member', 'Edit permissions': 'Edit permissions', 'Member': 'Member',
    'Admin access': 'Administrator: Manage members, configure permissions', 'Create': 'Create', 'Assign': 'Assign', 'Delete': 'Delete', 'Space': 'Space', 'Enable': 'Enable', 'Unarchive': 'Unarchive',
    'Transfer ownership desc': 'Please select the member you want to transfer ownership to. <b>Your account will automatically be set to default permissions with Admin access.</b>', 'Avatar': 'Avatar',
    'Save info': 'Save info', 'Cancel edit': 'Cancel edit', 'New members': 'New members'
  }
};

const I18nContext = createContext<{lang: string, t: (k: string) => string}>({ lang: 'vi', t: k => k });

// ============================================================================
// MOCK DATA & TYPES
// ============================================================================

const PERMISSION_GROUPS = [
  { id: 'space', label: 'Space', permissions: [{ id: 'space.admin', label: 'Admin', tooltip: 'Admin access' }] },
  { id: 'all', label: 'All items', tooltip: 'Applies to all items', permissions: [{ id: 'all.edit', label: 'Edit', tooltip: '' }, { id: 'all.assign', label: 'Assign', tooltip: 'Applies to tasks' }, { id: 'all.delete', label: 'Delete', tooltip: '' }] },
  { id: 'own', label: 'Own items', permissions: [{ id: 'own.create', label: 'Create', tooltip: '' }, { id: 'own.edit', label: 'Edit', tooltip: '' }, { id: 'own.assign', label: 'Assign', tooltip: 'Applies to tasks' }, { id: 'own.delete', label: 'Delete', tooltip: '' }] },
  { id: 'assigned', label: 'Assigned tasks', permissions: [{ id: 'assigned.edit', label: 'Edit', tooltip: '' }, { id: 'assigned.assign', label: 'Assign', tooltip: 'Applies to tasks' }, { id: 'assigned.delete', label: 'Delete', tooltip: '' }] }
];

const DEFAULT_PERMISSIONS = { 'space.admin': false, 'all.edit': false, 'all.assign': false, 'all.delete': false, 'own.create': true, 'own.edit': true, 'own.assign': true, 'own.delete': false, 'assigned.edit': true, 'assigned.assign': false, 'assigned.delete': false };
const OWNER_PERMISSIONS = { 'space.admin': true, 'all.edit': true, 'all.assign': true, 'all.delete': true, 'own.create': true, 'own.edit': true, 'own.assign': true, 'own.delete': true, 'assigned.edit': true, 'assigned.assign': true, 'assigned.delete': true };
const ADMIN_PERMISSIONS = { ...OWNER_PERMISSIONS };

const isDefaultPermissions = (perms: any) => {
  return !perms['space.admin'] && !perms['all.edit'] && !perms['all.assign'] && !perms['all.delete'] && perms['own.create'] && perms['own.edit'] && perms['own.assign'] && !perms['own.delete'] && perms['assigned.edit'] && !perms['assigned.assign'] && !perms['assigned.delete'];
};

const getBadge = (member: any) => {
  if (member.isOwner) return { label: 'Owner', color: 'bg-red-100 text-red-700' };
  if (member.permissions['space.admin']) return { label: 'Admin', color: 'bg-blue-100 text-blue-700' };
  if (isDefaultPermissions(member.permissions)) return { label: 'Default', color: 'bg-gray-100 text-gray-600' };
  return { label: 'Custom', color: 'bg-purple-100 text-purple-700' };
};

const MOCK_USERS = [
  { id: 'u1', name: 'Nguyễn Văn A', email: 'nva@company.com', avatar: 'NVA', color: 'bg-purple-100 text-purple-700' },
  { id: 'u2', name: 'Trần Thị B', email: 'ttb@company.com', avatar: 'TTB', color: 'bg-blue-100 text-blue-700' },
  { id: 'u3', name: 'Lê Văn C', email: 'lvc@company.com', avatar: 'LVC', color: 'bg-green-100 text-green-700' },
  { id: 'u4', name: 'Phạm Văn D', email: 'pvd@company.com', avatar: 'PVD', color: 'bg-amber-100 text-amber-700' },
];

const INITIAL_WORKSPACES = [
  { id: 'w_default', name: 'Công việc của tôi', isDefault: true, memberCount: 1, status: 'Active', creator: 'Nguyễn Mai Trang' },
  { id: 'w1', name: 'Project V-App 2', memberCount: 3, status: 'Active', creator: 'Phan Nguyễn Mai Trang' },
  { id: 'w2', name: 'Phòng Mua sắm tập trung', memberCount: 2, status: 'Active', creator: 'Phạm Anh Tuấn' },
  { id: 'w3', name: 'Phòng tuyển dụng', memberCount: 2, status: 'Active', creator: 'Nguyễn Mai Trang' },
  { id: 'w4', name: 'DAM - Document management', memberCount: 5, status: 'Active', creator: 'Phan Nguyễn Mai Trang' },
  { id: 'w5', name: 'Marketing Campaign 2024', memberCount: 8, status: 'Active', creator: 'Nguyễn Mai Trang' },
  { id: 'w6', name: 'Sales Pipeline', memberCount: 4, status: 'Active', creator: 'Lê Văn C' },
  { id: 'w7', name: 'R&D Innovation Lab', memberCount: 6, status: 'Active', creator: 'Trần Thị B' },
];

// ============================================================================
// UI COMPONENTS
// ============================================================================

const Drawer = ({ isOpen, onClose, title, children, footer, widthClass = "w-[400px]", hideHeader = false }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] overflow-hidden flex">
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0'}`} onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 flex max-w-full ${widthClass} transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-full h-full bg-white shadow-2xl flex flex-col">
          {!hideHeader && (
            <div className="flex-shrink-0 border-b border-gray-100 px-6 py-5 flex items-center justify-between bg-white z-10 relative">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-hidden flex flex-col bg-white relative">
            {children}
          </div>
          {footer && (
            <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 relative">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function WorkspacePermissionPrototype() {
  const { t, lang } = useContext(I18nContext);
  const [drawerType, setDrawerType] = useState<'NONE' | 'WORKSPACE_SETTINGS' | 'WORKSPACE_DETAILS' | 'ADD_MEMBER' | 'CREATE_WORKSPACE'>('NONE');
  const [mainView, setMainView] = useState<'WORKSPACE' | 'WORKSPACE_LIST'>('WORKSPACE');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [viewingWorkspaceId, setViewingWorkspaceId] = useState<string | null>(null);
  const [addMemberSource, setAddMemberSource] = useState<'WORKSPACE_SETTINGS' | 'OTHER'>('OTHER');
  
  const [currentUser] = useState({ id: 'u_me', name: 'Nguyễn Mai Trang (Bạn)', username: 'trangnm' });
  const [toast, setToast] = useState<{ id: number, message: string, action?: { label: string, onClick: () => void } } | null>(null);
  
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null);
  
  const [workspaces, setWorkspaces] = useState<any[]>(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('w4'); // DAM
  const [pinnedWorkspaceIds, setPinnedWorkspaceIds] = useState<string[]>(['w1', 'w2']);
  const [recentWorkspaceIds, setRecentWorkspaceIds] = useState<string[]>(['w3', 'w4']);
  
  const [workspaceMembers, setWorkspaceMembers] = useState<any[]>([
    { id: 'u_me', name: 'Nguyễn Mai Trang (Bạn)', username: 'trangnm', isOwner: true, permissions: { ...OWNER_PERMISSIONS }, avatar: 'MT', color: 'bg-[#C92A2A] text-white' },
    { id: 'u10', name: 'Phan Nguyễn Mai Trang', username: 'trangpn', isOwner: false, permissions: { ...ADMIN_PERMISSIONS }, avatar: 'PT', color: 'bg-blue-500 text-white' },
    { id: 'u11', name: 'Đỗ Thị Ngoan', username: 'ngoandt6', isOwner: false, permissions: { ...DEFAULT_PERMISSIONS }, avatar: 'ĐN', color: 'bg-blue-400 text-white' }
  ]);
  const [highlightedMembers, setHighlightedMembers] = useState<string[]>([]);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const sidebarItemRef = useRef<HTMLAnchorElement>(null);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces.find(w => w.isDefault)!;
  
  const currentMember = workspaceMembers.find(m => m.id === currentUser.id);
  const isCurrentUserAdmin = currentMember ? currentMember.permissions['space.admin'] : false;

  const showToast = (message: string, action?: { label: string, onClick: () => void }) => {
    const id = Date.now();
    setToast({ id, message, action });
    setTimeout(() => { setToast(prev => prev?.id === id ? null : prev); }, action ? 6000 : 3000); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
      if (popoverRef.current && sidebarItemRef.current && !popoverRef.current.contains(event.target as Node) && !sidebarItemRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddMembersSuccess = (newUsers: any[], goToMatrix: boolean) => {
    const newMembers = newUsers.map(u => ({ ...u, isOwner: false, permissions: { ...DEFAULT_PERMISSIONS } }));
    setWorkspaceMembers(prev => [...prev, ...newMembers]);
    setHighlightedMembers(newUsers.map(u => u.id));
    
    if (goToMatrix) {
      setDrawerType('WORKSPACE_SETTINGS');
      showToast(`Đã thêm ${newUsers.length} thành viên vào workspace.`);
    } else {
      showToast(`Đã thêm ${newUsers.length} thành viên vào workspace.`);
    }
  };

  const handleEditNewMember = (mId: string) => {
    setDrawerType('WORKSPACE_SETTINGS');
    setHighlightedMembers([mId]);
  };

  const handleRemoveNewMember = (mId: string) => {
    setWorkspaceMembers(prev => prev.filter(m => m.id !== mId));
  };

  const handlePinWorkspace = (e: React.MouseEvent, wId: string) => {
    e.stopPropagation();
    if (pinnedWorkspaceIds.includes(wId)) {
      setPinnedWorkspaceIds(prev => prev.filter(id => id !== wId));
      showToast(t('Unpinned success'));
    } else {
      if (pinnedWorkspaceIds.length >= 5) {
        showToast(t('Max 5 pinned'));
      } else {
        setPinnedWorkspaceIds(prev => [...prev, wId]);
        showToast(t('Pinned success'));
      }
    }
  };

  const handleSwitchWorkspace = (wId: string) => {
    setActiveWorkspaceId(wId);
    setRecentWorkspaceIds(prev => {
      const filtered = prev.filter(id => id !== wId);
      return [wId, ...filtered].slice(0, 10);
    });
    setMainView('WORKSPACE');
    setIsPopoverOpen(false);
  };

  const handleCreateWorkspace = (name: string) => {
    const newW = { id: `w_${Date.now()}`, name, memberCount: 1, status: 'Active', creator: currentUser.name };
    setWorkspaces([...workspaces, newW]);
    handleSwitchWorkspace(newW.id);
    setDrawerType('NONE');
    showToast(t('Created success'));
  };

  const handleWorkspaceAction = (action: string, wId: string) => {
    switch(action) {
      case 'VIEW':
        setViewingWorkspaceId(wId);
        setDrawerType('WORKSPACE_DETAILS');
        break;
      case 'EDIT':
        setViewingWorkspaceId(wId);
        setDrawerType('WORKSPACE_SETTINGS');
        break;
      case 'DISABLE':
        setWorkspaces(prev => prev.map(w => w.id === wId ? { ...w, status: w.status === 'Disabled' ? 'Active' : 'Disabled' } : w));
        showToast(t('Status changed'));
        break;
      case 'ARCHIVE':
        setWorkspaces(prev => prev.map(w => w.id === wId ? { ...w, status: w.status === 'Archived' ? 'Active' : 'Archived' } : w));
        showToast(t('Status changed'));
        break;
      case 'DELETE':
        setWorkspaceToDelete(wId);
        break;
    }
  };

  const confirmDeleteWorkspace = () => {
    if (!workspaceToDelete) return;
    setWorkspaces(prev => prev.filter(w => w.id !== workspaceToDelete));
    setPinnedWorkspaceIds(prev => prev.filter(id => id !== workspaceToDelete));
    setRecentWorkspaceIds(prev => prev.filter(id => id !== workspaceToDelete));
    setWorkspaceToDelete(null);
    showToast(t('Deleted success'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-900 font-sans">
      
      {/* TOAST */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col space-y-2 pointer-events-none">
        {toast && (
          <div key={toast.id} className="bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center justify-between transform transition-all duration-300 min-w-[300px] pointer-events-auto">
            <div className="flex items-center">
              <div className="bg-green-500/20 p-1 rounded-full mr-3 flex-shrink-0">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            {toast.action && (
              <button onClick={toast.action.onClick} className="ml-6 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap">
                {toast.action.label}
              </button>
            )}
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col relative z-40">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-[#C92A2A] rounded-lg flex items-center justify-center mr-3 shadow-sm text-white font-bold text-sm">V</div>
          <span className="font-bold text-gray-800 tracking-tight">Vin3S Workspace</span>
        </div>
        <div className="p-4 space-y-1 flex-1 relative">
          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Home className="w-4 h-4" /> <span>{t('Home')}</span>
          </a>
          
          <a 
            ref={sidebarItemRef}
            href="#" 
            onClick={(e) => { e.preventDefault(); setIsPopoverOpen(!isPopoverOpen); }}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mainView === 'WORKSPACE' || mainView === 'WORKSPACE_LIST' ? 'bg-red-50 text-[#C92A2A]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Layout className="w-4 h-4" /> <span>{t('Task management')}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </a>

          {/* POPOVER MENU */}
          {isPopoverOpen && (
            <div ref={popoverRef} className="absolute left-[240px] top-12 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-left-2 duration-200">
              <div className="flex-1 overflow-y-auto max-h-[60vh] py-2">
                <div className="px-3 py-1">
                  <p className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('Default')}</p>
                  {workspaces.filter(w => w.isDefault).map(w => (
                    <WorkspacePopoverItem 
                      key={w.id} 
                      workspace={{ ...w, name: w.id === 'w_default' && lang === 'en' ? t('My tasks') : w.name }} 
                      isActive={w.id === activeWorkspaceId}
                      onClick={() => handleSwitchWorkspace(w.id)}
                    />
                  ))}
                </div>
                {pinnedWorkspaceIds.length > 0 && (
                  <div className="px-3 py-1 mt-1 border-t border-gray-50">
                    <p className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                      {t('Pinned')} <span>{pinnedWorkspaceIds.length}/5</span>
                    </p>
                    {pinnedWorkspaceIds.map(pId => workspaces.find(w => w.id === pId)).filter(Boolean).map(w => (
                      <WorkspacePopoverItem 
                        key={w.id} 
                        workspace={w} 
                        isActive={w.id === activeWorkspaceId}
                        isPinned={true}
                        onTogglePin={(e: any) => handlePinWorkspace(e, w.id)}
                        onClick={() => handleSwitchWorkspace(w.id)}
                      />
                    ))}
                  </div>
                )}
                {pinnedWorkspaceIds.length < 5 && (() => {
                  const maxRecent = Math.min(2, 5 - pinnedWorkspaceIds.length);
                  const recents = recentWorkspaceIds
                    .filter(id => !pinnedWorkspaceIds.includes(id) && !workspaces.find(w => w.id === id)?.isDefault)
                    .slice(0, maxRecent)
                    .map(id => workspaces.find(w => w.id === id))
                    .filter(Boolean);
                  if (recents.length === 0) return null;
                  return (
                    <div className="px-3 py-1 mt-1 border-t border-gray-50">
                      <p className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('Recents')}</p>
                      {recents.map(w => (
                        <WorkspacePopoverItem 
                          key={w.id} 
                          workspace={w} 
                          isActive={w.id === activeWorkspaceId}
                          isPinned={false}
                          onTogglePin={(e: any) => handlePinWorkspace(e, w.id)}
                          onClick={() => handleSwitchWorkspace(w.id)}
                        />
                      ))}
                    </div>
                  );
                })()}
              </div>
              <div className="border-t border-gray-100 p-3 bg-gray-50/50 flex flex-col gap-2">
                <button onClick={() => { setDrawerType('CREATE_WORKSPACE'); setIsPopoverOpen(false); }} className="w-full py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm">
                  <Plus className="w-4 h-4 mr-2 text-[#C92A2A]" /> {t('Create workspace')}
                </button>
                <button onClick={() => { setMainView('WORKSPACE_LIST'); setIsPopoverOpen(false); }} className="w-full py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 mr-2" /> {t('View all workspaces')}
                </button>
              </div>
            </div>
          )}
        </div>
        <LanguageToggle />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {mainView === 'WORKSPACE' && activeWorkspace && (
          <>
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center shadow-sm">
                  <span className="text-gray-600 font-bold text-lg">{(activeWorkspace.id === 'w_default' && lang === 'en' ? t('My tasks') : activeWorkspace.name).charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight flex items-center">
                    {activeWorkspace.id === 'w_default' && lang === 'en' ? t('My tasks') : activeWorkspace.name}
                    {!activeWorkspace.isDefault && (
                      <button onClick={(e) => handlePinWorkspace(e, activeWorkspace.id)} className={`ml-2 p-1 rounded-md transition-colors ${pinnedWorkspaceIds.includes(activeWorkspace.id) ? 'text-[#C92A2A] hover:bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`} title={pinnedWorkspaceIds.includes(activeWorkspace.id) ? t('Unpin') : t('Pin')}>
                        <Pin className={`w-4 h-4 ${pinnedWorkspaceIds.includes(activeWorkspace.id) ? 'transform rotate-45' : ''}`} />
                      </button>
                    )}
                  </h1>
                  {!activeWorkspace.isDefault && <p className="text-xs text-gray-500 flex items-center mt-0.5"><Lock className="w-3 h-3 mr-1" /> {t('Internal workspace')}</p>}
                </div>
              </div>
              
              <div className="flex items-center space-x-5">
                {!activeWorkspace.isDefault && (
                  <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg transition-colors border ${isMenuOpen ? 'bg-gray-100 border-gray-300 text-gray-900' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        <button onClick={() => { setViewingWorkspaceId(activeWorkspace.id); setDrawerType('WORKSPACE_SETTINGS'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors">{t('Manage workspace')}</button>
                        <button onClick={() => { setAddMemberSource('OTHER'); setDrawerType('ADD_MEMBER'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#C92A2A] hover:bg-red-50 transition-colors flex items-center">
                          <Plus className="w-4 h-4 mr-2" /> {t('Add member')}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </header>

            <div className="flex-1 p-8 overflow-auto">
              <div className="max-w-5xl mx-auto bg-white p-12 rounded-2xl border border-gray-200 border-dashed text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Workspace: {activeWorkspace.id === 'w_default' && lang === 'en' ? t('My tasks') : activeWorkspace.name}</h2>
                <p className="text-gray-500">{t('Display area')}</p>
                <p className="text-sm text-gray-400 mt-4">{t('Use menu')}</p>
              </div>
            </div>
          </>
        )}

        {mainView === 'WORKSPACE_LIST' && (
          <div className="flex flex-col h-full bg-white">
            <header className="h-16 border-b border-gray-200 flex items-center justify-between px-8 bg-white shrink-0">
              <div className="flex items-center space-x-4">
                <button onClick={() => setMainView('WORKSPACE')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"><ChevronLeft className="w-5 h-5"/></button>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">{t('Workspace list')}</h1>
              </div>
              <button onClick={() => setDrawerType('CREATE_WORKSPACE')} className="px-4 py-2 bg-[#C92A2A] text-white rounded-lg text-sm font-semibold flex items-center hover:bg-red-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4 mr-2" /> {t('Create workspace')}
              </button>
            </header>

            <div className="flex-1 overflow-auto p-8 bg-gray-50">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center space-x-6 border-b border-gray-200">
                  {[`${t('All')} (${workspaces.length})`, `${t('Active')} (${workspaces.filter(w=>w.status==='Active').length})`, `${t('Archived')} (${workspaces.filter(w=>w.status==='Archived').length})`, `${t('Disabled')} (${workspaces.filter(w=>w.status==='Disabled').length})`].map((tab, i) => (
                    <button key={tab} className={`py-3 text-sm font-semibold border-b-2 transition-colors ${i === 0 ? 'border-[#C92A2A] text-[#C92A2A]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                      <tr><th className="px-6 py-4 border-b border-gray-200">STT</th><th className="px-6 py-4 border-b border-gray-200">{t('Workspace name')}</th><th className="px-6 py-4 border-b border-gray-200">{t('Status')}</th><th className="px-6 py-4 border-b border-gray-200">{t('Creator')}</th><th className="px-6 py-4 border-b border-gray-200 text-center">{t('Action')}</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {workspaces.map((w, index) => {
                        const displayName = w.id === 'w_default' && lang === 'en' ? t('My tasks') : w.name;
                        return (
                        <tr key={w.id} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="px-6 py-4 text-sm text-gray-500">#{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center cursor-pointer" onClick={() => handleSwitchWorkspace(w.id)}>
                              <div className="w-8 h-8 rounded bg-gray-100 text-gray-600 font-bold flex items-center justify-center text-xs mr-3">{displayName.charAt(0).toUpperCase()}</div>
                              <span className="font-semibold text-gray-900 group-hover:text-[#C92A2A] transition-colors">{displayName}</span>
                              {w.isDefault && <span className="ml-2 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">{t('Default')}</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {!w.isDefault && (
                              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${w.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' : w.status === 'Disabled' ? 'text-gray-500 bg-gray-100 border-gray-300' : 'text-yellow-700 bg-yellow-50 border-yellow-200'}`}>
                                {t(w.status)}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{!w.isDefault && w.creator}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-1">
                              {!w.isDefault ? (
                                <button onClick={(e) => { e.stopPropagation(); handlePinWorkspace(e, w.id); }} className={`p-1.5 rounded-md transition-colors ${pinnedWorkspaceIds.includes(w.id) ? 'text-[#C92A2A] hover:bg-red-50' : 'text-gray-300 hover:text-gray-600 hover:bg-gray-100'}`} title={pinnedWorkspaceIds.includes(w.id) ? t('Unpin') : t('Pin')}>
                                  <Pin className={`w-5 h-5 ${pinnedWorkspaceIds.includes(w.id) ? 'transform rotate-45' : ''}`} />
                                </button>
                              ) : (<div className="w-8 h-8"></div>)}
                              {!w.isDefault && <ListActionDropdown workspace={w} onAction={handleWorkspaceAction} onAddMember={() => { setAddMemberSource('OTHER'); setDrawerType('ADD_MEMBER'); }} />}
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DRAWERS */}
      <CombinedWorkspaceSettingsDrawer 
        isOpen={drawerType === 'WORKSPACE_SETTINGS' || drawerType === 'WORKSPACE_DETAILS'} 
        isReadOnly={drawerType === 'WORKSPACE_DETAILS' || !isCurrentUserAdmin} 
        workspace={workspaces.find(w => w.id === viewingWorkspaceId) || activeWorkspace} 
        onClose={() => { setDrawerType('NONE'); setHighlightedMembers([]); }} 
        members={workspaceMembers} 
        currentUser={currentUser} 
        highlightedMembers={highlightedMembers} 
        onClearHighlights={() => setHighlightedMembers([])} 
        onUpdateMembers={setWorkspaceMembers} 
        onShowToast={showToast} 
        onOpenAddMember={() => { setAddMemberSource('WORKSPACE_SETTINGS'); setDrawerType('ADD_MEMBER'); }} 
      />
      
      <AddMemberDrawer 
        isOpen={drawerType === 'ADD_MEMBER'} 
        onClose={() => {
          if (addMemberSource === 'WORKSPACE_SETTINGS') {
            setDrawerType('WORKSPACE_SETTINGS');
          } else {
            setDrawerType('NONE');
          }
        }} 
        onSuccess={handleAddMembersSuccess} 
        workspaceMembers={workspaceMembers} 
        source={addMemberSource}
        onEditNewMember={handleEditNewMember}
        onRemoveNewMember={handleRemoveNewMember}
      />
      <CreateWorkspaceDrawer isOpen={drawerType === 'CREATE_WORKSPACE'} onClose={() => setDrawerType('NONE')} onCreate={handleCreateWorkspace} />
      
      {/* GLOBAL MODALS */}
      {workspaceToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setWorkspaceToDelete(null)} />
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative z-10 animate-in zoom-in-95">
            <div className="flex items-center space-x-3 text-red-600 mb-3"><div className="bg-red-100 p-2 rounded-full"><AlertCircle className="w-6 h-6" /></div><h3 className="text-lg font-bold text-gray-900">{t('Delete workspace')}</h3></div>
            <p className="text-sm text-gray-600 mb-6">{t('Are you sure you want to delete this workspace?')}</p>
            <div className="flex space-x-3 justify-end">
              <button onClick={() => setWorkspaceToDelete(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg">{t('Cancel')}</button>
              <button onClick={confirmDeleteWorkspace} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg">{t('Confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SUB COMPONENTS
// ============================================================================

function LanguageToggle() {
  const { lang } = useContext(I18nContext);
  return (
    <div className="p-4 border-t border-gray-100">
      <button onClick={() => { document.dispatchEvent(new CustomEvent('toggleLang')); }} className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
        <Globe className="w-4 h-4 mr-2" />
        {lang === 'vi' ? 'Tiếng Việt' : 'English'}
      </button>
    </div>
  );
}

function WorkspacePopoverItem({ workspace, isActive, isPinned, onTogglePin, onClick }: any) {
  const { t } = useContext(I18nContext);
  return (
    <div onClick={onClick} className={`group flex items-center justify-between px-3 py-2.5 mx-2 my-0.5 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-red-50' : 'hover:bg-gray-100'}`}>
      <div className="flex items-center space-x-3 overflow-hidden flex-1">
        <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs ${isActive ? 'bg-[#C92A2A] text-white' : 'bg-gray-200 text-gray-700'}`}>
          {workspace.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="group/tooltip relative">
            <p className={`text-sm truncate font-semibold ${isActive ? 'text-[#C92A2A]' : 'text-gray-900'}`}>{workspace.name}</p>
            {workspace.name.length > 20 && (<div className="absolute top-full left-0 mt-1 hidden group-hover/tooltip:block w-max max-w-xs bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 pointer-events-none">{workspace.name}</div>)}
          </div>
          <p className="text-xs text-gray-500">{workspace.memberCount} {t('Members').toLowerCase()}</p>
        </div>
      </div>
      {!workspace.isDefault && (
        <button onClick={onTogglePin} className={`p-1.5 rounded-md transition-colors flex-shrink-0 ml-2 ${isPinned ? 'text-[#C92A2A] opacity-100 hover:bg-red-100' : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-800'}`} title={isPinned ? t('Unpin') : t('Pin')}><Pin className={`w-4 h-4 ${isPinned ? 'transform rotate-45' : ''}`} /></button>
      )}
      {workspace.isDefault && (<div className="w-7 h-7 flex items-center justify-center flex-shrink-0 ml-2"><Shield className="w-4 h-4 text-gray-300"/></div>)}
    </div>
  );
}

function ListActionDropdown({ workspace, onAction, onAddMember }: any) {
  const { t } = useContext(I18nContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handle = (action: string) => {
    onAction(action, workspace.id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md hover:bg-gray-200 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 text-left animate-in fade-in zoom-in-95">
          <button onClick={() => handle('VIEW')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"><Eye className="w-4 h-4 mr-2 text-gray-400"/> {t('View details')}</button>
          <button onClick={() => handle('EDIT')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"><Pencil className="w-4 h-4 mr-2 text-gray-400"/> {t('Edit')}</button>
          <button onClick={() => { onAddMember(); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-[#C92A2A] hover:bg-red-50 flex items-center"><Plus className="w-4 h-4 mr-2"/> {t('Add member')}</button>
          <div className="my-1 border-t border-gray-100"></div>
          <button onClick={() => handle('DISABLE')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"><Ban className="w-4 h-4 mr-2 text-gray-400"/> {workspace.status === 'Disabled' ? t('Enable') : t('Disabled')}</button>
          <button onClick={() => handle('ARCHIVE')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"><Archive className="w-4 h-4 mr-2 text-gray-400"/> {workspace.status === 'Archived' ? t('Unarchive') : t('Archived')}</button>
          <div className="my-1 border-t border-gray-100"></div>
          <button onClick={() => handle('DELETE')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"><Trash2 className="w-4 h-4 mr-2" /> {t('Remove')}</button>
        </div>
      )}
    </div>
  );
}

function CreateWorkspaceDrawer({ isOpen, onClose, onCreate }: any) {
  const { t } = useContext(I18nContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  useEffect(() => { if (isOpen) { setName(""); setDesc(""); } }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100"><h2 className="text-xl font-bold text-gray-900">{t('Create new workspace')}</h2><button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X className="w-5 h-5"/></button></div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">{t('Avatar')}</label>
            <div className="flex items-center space-x-4"><div className="w-16 h-16 rounded-xl bg-red-100 text-[#C92A2A] text-xl font-bold flex items-center justify-center">{name ? name.substring(0,3).toUpperCase() : 'AVA'}</div>
              <div><div className="flex space-x-2 mb-1"><button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><Camera className="w-4 h-4" /></button><button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button></div><p className="text-xs text-gray-500">{t('Allowed formats')}</p></div>
            </div>
          </div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">{t('Workspace name')} <span className="text-red-500">*</span></label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Enter workspace name')} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C92A2A]/20 focus:border-[#C92A2A] text-sm" maxLength={50} /><p className="text-right text-xs text-gray-400 mt-1">({name.length}/50)</p></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">{t('Description')}</label><textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t('Enter description')} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C92A2A]/20 focus:border-[#C92A2A] text-sm resize-none" maxLength={255}></textarea><p className="text-right text-xs text-gray-400 mt-1">({desc.length}/255)</p></div>
        </div>
        <div className="px-6 py-4 flex space-x-3 rounded-b-xl bg-white border-t border-gray-100"><button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">{t('Cancel')}</button><button onClick={() => name.trim() && onCreate(name)} disabled={!name.trim()} className={`flex-1 py-3 text-sm font-bold text-white rounded-full transition-colors ${name.trim() ? 'bg-[#C92A2A] hover:bg-red-700' : 'bg-red-400/80 cursor-not-allowed'}`}>{t('Create workspace')}</button></div>
      </div>
    </div>
  );
}

// ============================================================================
// COMBINED SETTINGS & PERMISSION DRAWERS
// ============================================================================

function CombinedWorkspaceSettingsDrawer({ isOpen, onClose, isReadOnly, workspace, members, currentUser, highlightedMembers, onClearHighlights, onUpdateMembers, onShowToast, onOpenAddMember }: any) {
  const { t } = useContext(I18nContext);
  const w = workspace || { name: 'DAM - Document management', description: '' };
  
  // Workspace Info State
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [wName, setWName] = useState(w.name);
  const [wDesc, setWDesc] = useState(w.description || "Workspace dành cho việc lưu trữ và quản lý tài liệu nội bộ.");
  
  useEffect(() => { 
    if (isOpen) {
      setWName(w.name); 
      setWDesc(w.description || "Workspace dành cho việc lưu trữ và quản lý tài liệu nội bộ.");
      setIsWorkspaceEdit(false);
    }
  }, [w, isOpen]);

  const handleSaveWorkspaceInfo = () => { setIsWorkspaceEdit(false); onShowToast(t('Save info') + " ✓"); };

  // Matrix State
  const [copiedPermissions, setCopiedPermissions] = useState<any>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferTargetId, setTransferTargetId] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<any>(null);
  const [isMatrixEdit, setIsMatrixEdit] = useState(false);
  const [localMembers, setLocalMembers] = useState(members);

  useEffect(() => { if (isOpen && highlightedMembers.length > 0) setIsMatrixEdit(true); else if (!isOpen) setIsMatrixEdit(false); }, [isOpen, highlightedMembers]);
  useEffect(() => { if (!isMatrixEdit) setLocalMembers(members); }, [members, isMatrixEdit]);

  const highlighted = localMembers.filter((m: any) => highlightedMembers.includes(m.id) && !m.isOwner);
  const regular = localMembers.filter((m: any) => !highlightedMembers.includes(m.id) || m.isOwner);
  regular.sort((a: any, b: any) => { if (a.isOwner) return -1; if (b.isOwner) return 1; return 0; });

  const handleToggle = (memberId: string, permId: string, currentValue: boolean) => {
    if (!isMatrixEdit) return;
    setLocalMembers(localMembers.map((m: any) => { if (m.id === memberId) return { ...m, permissions: { ...m.permissions, [permId]: !currentValue } }; return m; }));
  };

  const handlePaste = (memberId: string) => {
    if (!copiedPermissions) return;
    if (!isMatrixEdit) setIsMatrixEdit(true);
    setLocalMembers((prev: any[]) => prev.map((m: any) => m.id === memberId && !m.isOwner ? { ...m, permissions: { ...copiedPermissions } } : m));
    onShowToast(t('Paste permissions') + ' ✓');
  };

  const handleSaveMatrix = () => { onUpdateMembers(localMembers); setIsMatrixEdit(false); onShowToast(t('Save permissions') + " ✓"); onClearHighlights(); };
  const handleCancelMatrix = () => { setLocalMembers(members); setIsMatrixEdit(false); };
  
  const handleTransferOwnership = () => {
    const updated = members.map((m: any) => {
      if (m.id === currentUser.id) return { ...m, isOwner: false, permissions: { ...DEFAULT_PERMISSIONS, 'space.admin': true } };
      if (m.id === transferTargetId) return { ...m, isOwner: true, permissions: { ...OWNER_PERMISSIONS } };
      return m;
    });
    onUpdateMembers(updated);
    setLocalMembers(updated);
    setShowTransferModal(false);
    onShowToast(t('Transfer Owner') + ' ✓');
  };

  if (isReadOnly) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title={t('Workspace details')} widthClass="w-[500px]">
        <div className="p-6 space-y-10">
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('Details')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{t('Workspace name')}</label>
                <input type="text" defaultValue={w.name} disabled={true} className="w-full py-2 bg-transparent border-transparent px-0 font-semibold text-gray-900 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{t('Description')}</label>
                <textarea rows={3} disabled={true} className="w-full py-2 bg-transparent border-transparent px-0 text-gray-700 text-sm outline-none resize-none" defaultValue={w.description || "Workspace dành cho việc lưu trữ và quản lý tài liệu nội bộ."} />
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('Members')}</h3>
            <div className="space-y-2">
              {members.map((m: any) => { 
                const badge = getBadge(m); 
                return (
                  <div key={m.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${m.color}`}>{m.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 flex items-center">
                          {m.name}
                          {badge.label === 'Owner' || badge.label === 'Admin' ? (<span className={`ml-2 ${badge.color} text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md`}>{t(badge.label)}</span>) : null}
                        </p>
                        <p className="text-xs text-gray-500">{m.username || m.email}</p>
                      </div>
                    </div>
                  </div>
                ); 
              })}
            </div>
          </section>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={t('Manage workspace')} widthClass="w-[1100px]">
      <div className="flex flex-col h-full bg-white relative">
        
        {/* TOP SECTION: WORKSPACE INFO */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0 z-20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t('Details')}</h3>
            {!isWorkspaceEdit ? (
              <button onClick={() => setIsWorkspaceEdit(true)} className="text-[#C92A2A] text-sm font-bold flex items-center hover:underline"><Pencil className="w-4 h-4 mr-1" /> {t('Edit')}</button>
            ) : (
              <div className="flex space-x-3">
                <button onClick={() => { setIsWorkspaceEdit(false); setWName(w.name); setWDesc(w.description || "Workspace dành cho việc lưu trữ và quản lý tài liệu nội bộ."); }} className="text-gray-500 text-sm font-bold hover:underline bg-white px-3 py-1.5 border border-gray-200 rounded-md shadow-sm">{t('Cancel edit')}</button>
                <button onClick={handleSaveWorkspaceInfo} className="text-white text-sm font-bold hover:bg-red-700 bg-[#C92A2A] px-3 py-1.5 rounded-md shadow-sm">{t('Save info')}</button>
              </div>
            )}
          </div>
          <div className="flex space-x-8">
            <div className="flex-shrink-0">
              <label className="block text-xs font-semibold text-gray-500 mb-2">{t('Avatar')}</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-red-100 text-[#C92A2A] text-xl font-bold flex items-center justify-center shadow-inner">{wName ? wName.substring(0,3).toUpperCase() : 'AVA'}</div>
                {isWorkspaceEdit && (
                  <div><div className="flex space-x-2 mb-1"><button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors bg-white shadow-sm"><Camera className="w-4 h-4" /></button></div><p className="text-[10px] text-gray-400 font-medium max-w-[100px]">Max 1MB</p></div>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t('Workspace name')}</label>
                <input type="text" value={wName} onChange={(e) => setWName(e.target.value)} disabled={!isWorkspaceEdit} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors ${!isWorkspaceEdit ? 'bg-transparent border-transparent px-0 font-semibold text-gray-900 text-base' : 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#C92A2A]/20 focus:border-[#C92A2A]'}`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t('Description')}</label>
                <textarea rows={2} value={wDesc} onChange={(e) => setWDesc(e.target.value)} disabled={!isWorkspaceEdit} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none resize-none transition-colors ${!isWorkspaceEdit ? 'bg-transparent border-transparent px-0 text-gray-700' : 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#C92A2A]/20 focus:border-[#C92A2A]'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: MATRIX */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-20 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t('Members')}</h3>
            {copiedPermissions && (<div className="flex items-center text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200"><ClipboardPaste className="w-4 h-4 mr-1.5" /> {t('Holding copied permissions')}</div>)}
          </div>
          <div className="flex items-center space-x-3">
            {!isMatrixEdit && (<button onClick={onOpenAddMember} className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg text-sm font-semibold flex items-center hover:bg-gray-50 shadow-sm transition-colors"><Plus className="w-4 h-4 mr-2 text-[#C92A2A]" /> {t('Add new member')}</button>)}
            {!isMatrixEdit ? (
              <button onClick={() => setIsMatrixEdit(true)} className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-sm font-semibold flex items-center hover:bg-indigo-100 shadow-sm transition-colors"><Pencil className="w-4 h-4 mr-2" /> {t('Edit permissions')}</button>
            ) : (
              <><button onClick={handleCancelMatrix} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">{t('Cancel')}</button><button onClick={handleSaveMatrix} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center hover:bg-indigo-700 transition-colors shadow-sm"><Check className="w-4 h-4 mr-2" /> {t('Save permissions')}</button></>
            )}
          </div>
        </div>

        {/* MATRIX TABLE */}
        <div className="flex-1 overflow-x-auto relative pb-32">
          <table className="w-full min-w-[max-content] border-collapse text-left border-spacing-0">
            <thead className="bg-blue-50/50 text-gray-800 relative z-30">
              <tr>
                <th rowSpan={2} className="sticky left-0 bg-blue-50/95 py-3 px-6 border-b border-r border-gray-200 font-bold w-[280px] align-bottom pb-4 z-40 shadow-[1px_0_4px_-1px_rgba(0,0,0,0.1)] backdrop-blur-md">{t('Member')}</th>
                {PERMISSION_GROUPS.map((group, i) => (
                  <th key={group.id} colSpan={group.permissions.length} className={`py-2 px-2 border-b border-gray-200 text-center font-bold text-sm ${i > 0 ? 'border-l' : ''}`}>
                    <div className="flex items-center justify-center group/tooltip relative cursor-help">
                      {t(group.label)}
                      {group.tooltip && <Info className="w-3.5 h-3.5 ml-1.5 text-gray-400" />}
                      {group.tooltip && (<div className="absolute top-full mt-2 hidden group-hover/tooltip:block w-56 bg-gray-900 text-white text-xs px-3 py-2 rounded text-center z-[100] font-normal shadow-xl">{t(group.tooltip)}<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div></div>)}
                    </div>
                  </th>
                ))}
                <th rowSpan={2} className="sticky right-0 bg-blue-50/95 py-3 px-4 border-b border-l border-gray-200 w-16 align-bottom pb-4 text-center z-40 shadow-[-1px_0_4px_-1px_rgba(0,0,0,0.1)] backdrop-blur-md">...</th>
              </tr>
              <tr>
                {PERMISSION_GROUPS.map((group, i) => (
                  group.permissions.map((p, j) => (
                    <th key={p.id} className={`py-2 px-1 border-b border-gray-200 text-center text-xs font-semibold text-gray-600 ${j === 0 && i > 0 ? 'border-l' : ''}`}>
                      <div className="flex items-center justify-center group/tooltip relative cursor-help">
                        {t(p.label)}
                        {p.tooltip && <Info className="w-3 h-3 ml-1 text-gray-400" />}
                        {p.tooltip && (<div className="absolute top-full mt-2 hidden group-hover/tooltip:block w-40 bg-gray-900 text-white text-xs px-2 py-1.5 rounded text-center z-[100] font-normal shadow-xl">{t(p.tooltip)}<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div></div>)}
                      </div>
                    </th>
                  ))
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100 relative z-10 bg-white">
              {highlighted.length > 0 && (
                <>
                  <tr className="bg-yellow-50/80"><td colSpan={13} className="sticky left-0 py-1.5 px-6 bg-yellow-50/80 z-20"><span className="text-[11px] font-bold text-yellow-800 uppercase tracking-wider">{t('New')}</span></td></tr>
                  {highlighted.map((member: any) => (<MemberRow key={member.id} member={member} currentUser={currentUser} hasCopied={!!copiedPermissions} onToggle={handleToggle} onCopy={() => { setCopiedPermissions(member.permissions); onShowToast(t('Copy permissions') + ` ${member.name}`); }} onPaste={() => handlePaste(member.id)} onTransfer={() => setShowTransferModal(true)} onRemove={() => setMemberToRemove(member)} isHighlighted={true} isEditMode={isMatrixEdit} />))}
                  <tr className="border-b-4 border-gray-200"><td colSpan={13} className="p-0"></td></tr>
                </>
              )}
              {regular.map((member: any) => (<MemberRow key={member.id} member={member} currentUser={currentUser} hasCopied={!!copiedPermissions} onToggle={handleToggle} onCopy={() => { setCopiedPermissions(member.permissions); onShowToast(t('Copy permissions') + ` ${member.name}`); }} onPaste={() => handlePaste(member.id)} onTransfer={() => setShowTransferModal(true)} onRemove={() => setMemberToRemove(member)} isHighlighted={false} isEditMode={isMatrixEdit} />))}
            </tbody>
          </table>
        </div>
      </div>

      {showTransferModal && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-red-600 mb-3"><div className="bg-red-100 p-2 rounded-full"><Shield className="w-6 h-6" /></div><h3 className="text-lg font-bold text-gray-900">{t('Transfer Owner')}</h3></div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('Transfer ownership desc') }}></p>
            <div className="mb-6"><label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('Select member')}</label><div className="relative">
              <select value={transferTargetId} onChange={(e) => setTransferTargetId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none appearance-none bg-white">
                <option value="" disabled>{t('Select member')}</option>
                {members.filter((m: any) => m.id !== currentUser.id).map((m: any) => (<option key={m.id} value={m.id}>{m.name} ({m.username || m.email})</option>))}
              </select><ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div></div>
            <div className="flex space-x-3 justify-end"><button onClick={() => setShowTransferModal(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">{t('Cancel')}</button><button disabled={!transferTargetId} onClick={handleTransferOwnership} className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors shadow-sm ${transferTargetId ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}>{t('Confirm')}</button></div>
          </div>
        </div>
      )}

      {memberToRemove && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-red-600 mb-3"><div className="bg-red-100 p-2 rounded-full"><Trash2 className="w-6 h-6" /></div><h3 className="text-lg font-bold text-gray-900">{t('Remove member')}</h3></div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">{t('Are you sure you want to remove this member?')}</p>
            <div className="flex space-x-3 justify-end">
              <button onClick={() => setMemberToRemove(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">{t('Cancel')}</button>
              <button onClick={() => {
                const updated = members.filter((m: any) => m.id !== memberToRemove.id);
                onUpdateMembers(updated);
                setLocalMembers(updated);
                setMemberToRemove(null);
                onShowToast(t('Remove member') + ' ✓');
              }} className="px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors shadow-sm bg-red-600 hover:bg-red-700">{t('Confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function AddMemberDrawer({ isOpen, onClose, onSuccess, workspaceMembers, source, onEditNewMember, onRemoveNewMember }: any) {
  const { t } = useContext(I18nContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [justAddedUsers, setJustAddedUsers] = useState<any[]>([]);

  useEffect(() => { 
    if (isOpen) { setSearchTerm(""); setSelectedUsers([]); setStep(1); setJustAddedUsers([]); } 
  }, [isOpen]);

  const availableUsers = MOCK_USERS.filter(u => !workspaceMembers.some((m: any) => m.id === u.id));
  const filteredUsers = availableUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const toggleUser = (user: any) => { if (selectedUsers.find(u => u.id === user.id)) setSelectedUsers(selectedUsers.filter(u => u.id !== user.id)); else setSelectedUsers([...selectedUsers, user]); };
  
  if (!isOpen) return null;

  const handleSave = () => {
    if (source === 'WORKSPACE_SETTINGS') {
      onSuccess(selectedUsers, true);
    } else {
      onSuccess(selectedUsers, false);
      setJustAddedUsers(selectedUsers);
      setStep(2);
    }
  };

  if (step === 2) {
    return (
      <div className="fixed inset-0 z-[70] overflow-hidden flex">
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" onClick={onClose} />
        <div className="fixed inset-y-0 right-0 flex w-[400px] bg-white shadow-2xl flex-col animate-slide-in-right">
          <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">{t('New members')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2"><X className="w-5 h-5"/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 font-medium flex items-center">
              <Check className="w-5 h-5 mr-2" /> Đã thêm {justAddedUsers.length} thành viên
            </div>
            {justAddedUsers.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl transition-shadow hover:shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${u.color}`}>{u.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => onEditNewMember(u.id)} className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors" title={t('Edit')}><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => { onRemoveNewMember(u.id); setJustAddedUsers(prev => prev.filter(user => user.id !== u.id)); }} className="p-1.5 bg-white text-gray-400 hover:text-red-600 rounded hover:bg-red-50 border border-transparent transition-colors" title={t('Remove')}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-100 bg-white"><button onClick={onClose} className="w-full py-3 text-sm font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition-colors">{t('Done')}</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden flex">
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 flex w-[400px] bg-white shadow-2xl flex-col animate-slide-in-right">
        <div className="px-6 py-5 flex items-center border-b border-gray-100"><button onClick={onClose} className="mr-3 text-gray-500 hover:text-gray-900 transition-colors"><ChevronDown className="w-5 h-5 rotate-90" /></button><h2 className="text-xl font-bold text-gray-900">{t('Add member')}</h2></div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="relative"><Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('Search users...')} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#C92A2A]/20 focus:border-[#C92A2A]" /></div>
          {selectedUsers.length > 0 && (<div className="flex flex-wrap gap-2">{selectedUsers.map(u => (<div key={u.id} className="flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full border border-gray-200"><span className="font-medium mr-1">{u.name}</span><button onClick={() => toggleUser(u)} className="ml-1 hover:bg-gray-200 rounded-full p-0.5"><X className="w-3 h-3" /></button></div>))}</div>)}
          <div className="space-y-1">
            {filteredUsers.map(user => {
              const isSelected = selectedUsers.some(u => u.id === user.id);
              return (<div key={user.id} onClick={() => toggleUser(user)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border ${isSelected ? 'bg-red-50/50 border-red-200' : 'bg-white border-transparent hover:bg-gray-50'}`}><div className="flex items-center space-x-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${user.color}`}>{user.avatar}</div><div><p className={`text-sm font-semibold ${isSelected ? 'text-[#C92A2A]' : 'text-gray-900'}`}>{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div></div><div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#C92A2A] border-[#C92A2A]' : 'border-gray-300'}`}>{isSelected && <Check className="w-3.5 h-3.5 text-white" />}</div></div>);
            })}
            {availableUsers.length === 0 && <p className="text-center text-sm text-gray-500 mt-4">{t('No more users')}</p>}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-white"><button disabled={selectedUsers.length === 0} onClick={handleSave} className={`w-full py-3 text-sm font-bold text-white rounded-lg shadow-sm transition-colors ${selectedUsers.length > 0 ? 'bg-[#C92A2A] hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}>{t('Done')}</button></div>
      </div>
    </div>
  );
}

function MemberRow({ member, currentUser, hasCopied, onToggle, onCopy, onPaste, onTransfer, onRemove, isHighlighted, isEditMode }: any) {
  const { t } = useContext(I18nContext);
  const badge = getBadge(member);
  return (
    <tr className={`hover:bg-gray-50/50 transition-colors group ${isHighlighted ? 'bg-yellow-50/40 animate-pulse' : ''}`}>
      <td className="sticky left-0 bg-white py-3 px-6 border-r border-gray-100 z-20 shadow-[1px_0_4px_-1px_rgba(0,0,0,0.05)] group-hover:bg-gray-50/90 transition-colors">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${member.color}`}>{member.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center"><p className="text-sm font-semibold text-gray-900 truncate mr-2">{member.name}</p><div className="group/badge relative flex-shrink-0 cursor-help"><span className={`${badge.color} text-[9px] uppercase font-bold px-1.5 py-0.5 rounded flex items-center`}>{badge.label === 'Owner' && <Shield className="w-2.5 h-2.5 mr-1"/>}{t(badge.label)}</span></div></div><p className="text-xs text-gray-500 truncate">{member.username || member.email}</p>
          </div>
        </div>
      </td>
      {PERMISSION_GROUPS.map((group, i) => (group.permissions.map((p, j) => {
        const isChecked = member.permissions[p.id] || false;
        const isDisabled = !isEditMode || member.isOwner; 
        const checkedBg = isEditMode ? 'bg-[#57D9A3] border-[#57D9A3]' : 'bg-gray-400 border-gray-400';
        return (
          <td key={p.id} className={`py-3 px-1 text-center ${j === 0 && i > 0 ? 'border-l border-gray-100' : ''}`}>
            {member.isOwner ? null : (<label className={`inline-flex items-center justify-center ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}><input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => onToggle(member.id, p.id, isChecked)} /><div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${isChecked ? checkedBg : 'bg-gray-100 border-gray-300'} ${!isEditMode && !isChecked ? 'opacity-50' : ''} ${isEditMode && !isChecked ? 'group-hover:border-gray-400' : ''}`}>{isChecked && <Check className="w-3.5 h-3.5 text-white" />}</div></label>)}
          </td>
        );
      })))}
      <td className="sticky right-0 bg-white py-3 px-2 text-center border-l border-gray-100 z-20 shadow-[-1px_0_4px_-1px_rgba(0,0,0,0.05)] group-hover:bg-gray-50/90 transition-colors">
        <MemberActionDropdown member={member} currentUser={currentUser} hasCopied={hasCopied} onCopy={onCopy} onPaste={onPaste} onTransfer={onTransfer} onRemove={onRemove} isEditMode={isEditMode} />
      </td>
    </tr>
  );
}

function MemberActionDropdown({ member, currentUser, hasCopied, onCopy, onPaste, onTransfer, onRemove, isEditMode }: any) {
  const { t } = useContext(I18nContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handle = (actionFn: () => void) => {
    actionFn();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md hover:bg-gray-200 transition-colors focus:outline-none">
        <MoreHorizontal className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 text-left animate-in fade-in zoom-in-95">
          {!member.isOwner && (
            <>
              <button onClick={() => handle(onCopy)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"><Copy className="w-4 h-4 mr-2 text-gray-400" /> {t('Copy permissions')}</button>
              <button disabled={!hasCopied} onClick={() => handle(onPaste)} className={`w-full text-left px-4 py-2 text-sm flex items-center ${hasCopied ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}><ClipboardPaste className="w-4 h-4 mr-2 text-gray-400" /> {t('Paste permissions')}</button>
              {!isEditMode && (
                <>
                  <div className="my-1 border-t border-gray-100"></div>
                  <button onClick={() => handle(onRemove)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"><Trash2 className="w-4 h-4 mr-2" /> {t('Remove member')}</button>
                </>
              )}
            </>
          )}
          {member.isOwner && member.id === currentUser.id && !isEditMode && (
            <button onClick={() => handle(onTransfer)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"><Shield className="w-4 h-4 mr-2" /> {t('Transfer Owner')}</button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const handleToggle = () => setLang(prev => prev === 'vi' ? 'en' : 'vi');
    document.addEventListener('toggleLang', handleToggle);
    return () => document.removeEventListener('toggleLang', handleToggle);
  }, []);

  const t = (key: string) => {
    if (DICT[lang] && DICT[lang][key]) return DICT[lang][key];
    return key;
  };

  return (
    <I18nContext.Provider value={{ lang, t }}>
      <WorkspacePermissionPrototype />
    </I18nContext.Provider>
  );
}
