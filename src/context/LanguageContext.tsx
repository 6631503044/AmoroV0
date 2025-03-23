"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Localization from "expo-localization"
import { I18n } from "i18n-js"

// Define available languages
export const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "th", name: "Thai" },
  { id: "es", name: "Spanish" },
  { id: "fr", name: "French" },
]

// Define the translations
const translations = {
  en: {
    profile: "Profile",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    language: "Language",
    permissions: "Permissions",
    logOut: "Log Out",
    addPartner: "Add Partner",
    connectWithPartner: "Connect with your partner",
    yourPartner: "Your Partner",
    invitations: "Invitations",
    noNewInvitations: "No new invitations",
    youHaveNewInvitation: "You have a new invitation",
    partnerInvitations: "Partner Invitations",
    noInvitationsYet: "You don't have any invitations yet",
    close: "Close",
    accept: "Accept",
    reject: "Reject",
    settings: "Settings",
    account: "Account",
    // Add more translations as needed
  },
  th: {
    profile: "โปรไฟล์",
    editProfile: "แก้ไขโปรไฟล์",
    changePassword: "เปลี่ยนรหัสผ่าน",
    darkMode: "โหมดมืด",
    notifications: "การแจ้งเตือน",
    language: "ภาษา",
    permissions: "สิทธิ์",
    logOut: "ออกจากระบบ",
    addPartner: "เพิ่มคู่",
    connectWithPartner: "เชื่อมต่อกับคู่ของคุณ",
    yourPartner: "คู่ของคุณ",
    invitations: "คำเชิญ",
    noNewInvitations: "ไม่มีคำเชิญใหม่",
    youHaveNewInvitation: "คุณมีคำเชิญใหม่",
    partnerInvitations: "คำเชิญจากคู่",
    noInvitationsYet: "คุณยังไม่มีคำเชิญ",
    close: "ปิด",
    accept: "ยอมรับ",
    reject: "ปฏิเสธ",
    settings: "ตั้งค่า",
    account: "บัญชี",
    // Add more translations as needed
  },
  es: {
    profile: "Perfil",
    editProfile: "Editar Perfil",
    changePassword: "Cambiar Contraseña",
    darkMode: "Modo Oscuro",
    notifications: "Notificaciones",
    language: "Idioma",
    permissions: "Permisos",
    logOut: "Cerrar Sesión",
    addPartner: "Añadir Pareja",
    connectWithPartner: "Conectar con tu pareja",
    yourPartner: "Tu Pareja",
    invitations: "Invitaciones",
    noNewInvitations: "No hay nuevas invitaciones",
    youHaveNewInvitation: "Tienes una nueva invitación",
    partnerInvitations: "Invitaciones de Pareja",
    noInvitationsYet: "Aún no tienes invitaciones",
    close: "Cerrar",
    accept: "Aceptar",
    reject: "Rechazar",
    settings: "Configuración",
    account: "Cuenta",
    // Add more translations as needed
  },
  fr: {
    profile: "Profil",
    editProfile: "Modifier le Profil",
    changePassword: "Changer le Mot de Passe",
    darkMode: "Mode Sombre",
    notifications: "Notifications",
    language: "Langue",
    permissions: "Autorisations",
    logOut: "Déconnexion",
    addPartner: "Ajouter un Partenaire",
    connectWithPartner: "Connectez-vous avec votre partenaire",
    yourPartner: "Votre Partenaire",
    invitations: "Invitations",
    noNewInvitations: "Pas de nouvelles invitations",
    youHaveNewInvitation: "Vous avez une nouvelle invitation",
    partnerInvitations: "Invitations de Partenaire",
    noInvitationsYet: "Vous n'avez pas encore d'invitations",
    close: "Fermer",
    accept: "Accepter",
    reject: "Refuser",
    settings: "Paramètres",
    account: "Compte",
    // Add more translations as needed
  },
}

// Create the i18n instance
const i18n = new I18n(translations)

// Set the default locale
i18n.defaultLocale = "en"
i18n.enableFallback = true

// Define the context type
type LanguageContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string, params?: object) => string
  getLocaleDisplayName: (localeId: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState("en")

  // Load the saved locale on mount
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem("userLocale")
        if (savedLocale) {
          setLocale(savedLocale)
        } else {
          // Use device locale as fallback
          const deviceLocale = Localization.locale.split("-")[0]
          // Check if device locale is supported
          if (Object.keys(translations).includes(deviceLocale)) {
            setLocale(deviceLocale)
          }
        }
      } catch (error) {
        console.error("Failed to load locale:", error)
      }
    }

    loadLocale()
  }, [])

  // Update i18n locale when locale changes
  useEffect(() => {
    i18n.locale = locale
    // Save the locale to AsyncStorage
    AsyncStorage.setItem("userLocale", locale).catch((error) => {
      console.error("Failed to save locale:", error)
    })
  }, [locale])

  // Translate function
  const t = (key: string, params?: object) => {
    return i18n.t(key, params)
  }

  // Get display name for a locale
  const getLocaleDisplayName = (localeId: string) => {
    const language = LANGUAGES.find((lang) => lang.id === localeId)
    return language ? language.name : localeId
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, getLocaleDisplayName }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Create a hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

