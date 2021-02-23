
import React from 'react';
import { Menu, Dropdown } from 'antd';
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

interface userDropdownProps{
    onClick: () => void;
    children:  React.ReactNode;
    logOut: () => void;
    onChangePassword: () => void;
}

const UserDropdown: React.FC<userDropdownProps> = props=> {
    const { onClick, children, logOut, onChangePassword } = props;
    return (        
        <Dropdown
            overlay={(
                <Menu>
                    <Menu.Item key="profile"  onClick={onClick}>
                        <UserOutlined />     Thông tin
                    </Menu.Item>
                    <Menu.Item key="change-pass" onClick={onChangePassword} >
                        <LockOutlined />     Đổi mật khẩu
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout" onClick={logOut}>
                        <LogoutOutlined />   Đăng xuất
                    </Menu.Item>
                </Menu>
            )}
        >
            <span
            style={{
                width: '40px',
                display: 'inline-block',
                textAlign: 'center',
            }}
            >
            {children}
            </span>
        </Dropdown>
    )
}


export default UserDropdown
